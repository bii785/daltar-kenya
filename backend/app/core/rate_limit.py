from fastapi import HTTPException, Request, status

from app.core.redis import redis_client


def rate_limiter(key_prefix: str, max_attempts: int, window_seconds: int):
    """Dependency factory: limits requests to `max_attempts` per `window_seconds`,
    keyed by client IP. Fixed-window counter — INCR on every hit, EXPIRE set only
    on the first hit in a window, so the count resets `window_seconds` after the
    first attempt in that window.

    Usage: Depends(rate_limiter("login", max_attempts=5, window_seconds=300))
    """

    def dependency(request: Request) -> None:
        client_ip = request.client.host if request.client else "unknown"
        redis_key = f"ratelimit:{key_prefix}:{client_ip}"

        current = redis_client.incr(redis_key)
        if current == 1:
            redis_client.expire(redis_key, window_seconds)

        if current > max_attempts:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Too many attempts. Please try again in a few minutes.",
            )

    return dependency
