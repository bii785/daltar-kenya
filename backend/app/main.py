from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.routes import admin, auth, leads, orders, products, webhooks
from app.core.config import settings
from app.core.redis import redis_client
from app.db.session import get_db

app = FastAPI(title="Daltar Kenya API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(leads.router)
app.include_router(products.router)
app.include_router(orders.router)
app.include_router(webhooks.router)
app.include_router(admin.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/db-health")
def db_health_check(db: Session = Depends(get_db)):
    """Confirms the app can actually reach Neon, separate from /health
    which only proves the API process itself is running."""
    db.execute(text("SELECT 1"))
    return {"status": "ok", "database": "connected"}


@app.get("/redis-health")
def redis_health_check():
    redis_client.ping()
    return {"status": "ok", "redis": "connected"}
