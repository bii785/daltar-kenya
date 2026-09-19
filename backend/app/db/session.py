from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

# pool_pre_ping avoids stale-connection errors against Neon, which can close
# idle connections; it checks the connection is alive before handing it out.
engine = create_engine(settings.database_url, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency: yields a DB session, always closed after the request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
