import uuid
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings
from app.core.redis import redis_client

# Pinned to bcrypt==4.0.1 in requirements.txt — passlib's bcrypt backend
# breaks on bcrypt>=4.1 (a known compatibility issue: bcrypt removed the
# `__about__` attribute passlib reads to detect the version).
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # jti (JWT ID) — a unique id per issued token, so logout can denylist this
    # one token specifically without needing to store the full JWT string.
    to_encode = {"sub": subject, "role": role, "exp": expire, "jti": str(uuid.uuid4())}
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=ALGORITHM)


def decode_access_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
    except JWTError:
        return None


def denylist_token(jti: str, exp_epoch: int) -> None:
    """Called on logout. Stores the token's jti in Redis with a TTL matching
    its remaining lifetime — it auto-expires from Redis at the exact moment
    the token itself would have expired anyway, so nothing needs manual cleanup."""
    ttl_seconds = max(exp_epoch - int(datetime.now(timezone.utc).timestamp()), 0)
    if ttl_seconds > 0:
        redis_client.setex(f"denylist:{jti}", ttl_seconds, "1")


def is_token_denylisted(jti: str) -> bool:
    return redis_client.exists(f"denylist:{jti}") == 1

