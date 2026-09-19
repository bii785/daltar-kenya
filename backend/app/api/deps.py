import uuid

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token, is_token_denylisted
from app.db.session import get_db
from app.models.user import User, UserRole

# auto_error=False so we can raise our own 401 with a consistent message
# instead of FastAPI's default "Not authenticated" for a missing header.
bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    payload = decode_access_token(credentials.credentials)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    if is_token_denylisted(payload.get("jti", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has been revoked"
        )

    try:
        user_id = uuid.UUID(payload.get("sub"))
    except (TypeError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token subject")

    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user


def require_role(*allowed_roles: UserRole):
    """Dependency factory — e.g. Depends(require_role(UserRole.staff, UserRole.admin)).
    Not used by any route yet; Phase 13 (route protection by role) is what
    actually applies this to /staff and /admin endpoints."""

    def dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions"
            )
        return current_user

    return dependency
