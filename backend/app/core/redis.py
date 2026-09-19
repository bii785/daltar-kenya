import redis

from app.core.config import settings

# decode_responses=True so values come back as str, not bytes — simpler
# call sites everywhere else in the app.
redis_client = redis.Redis.from_url(settings.redis_url, decode_responses=True)
