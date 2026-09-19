from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.api.deps import bearer_scheme, get_current_user
from app.core.rate_limit import rate_limiter
from app.core.security import create_access_token, decode_access_token, denylist_token, verify_password
from app.crud.user import create_user, get_user_by_email
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import Token, UserCreate, UserLogin, UserRead

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post(
    "/register",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limiter("register", max_attempts=10, window_seconds=3600))],
)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user_in.email):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Email already registered"
        )

    user = create_user(db, user_in)
    token = create_access_token(subject=str(user.id), role=user.role.value)
    return Token(access_token=token, user=UserRead.model_validate(user))


@router.post(
    "/login",
    response_model=Token,
    dependencies=[Depends(rate_limiter("login", max_attempts=5, window_seconds=300))],
)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, credentials.email)
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password"
        )

    token = create_access_token(subject=str(user.id), role=user.role.value)
    return Token(access_token=token, user=UserRead.model_validate(user))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(auth_credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme)):
    if auth_credentials is None:
        return None

    payload = decode_access_token(auth_credentials.credentials)
    if payload:
        denylist_token(payload["jti"], payload["exp"])
    return None


@router.get("/me", response_model=UserRead)
def read_current_user(current_user: User = Depends(get_current_user)):
    return UserRead.model_validate(current_user)

