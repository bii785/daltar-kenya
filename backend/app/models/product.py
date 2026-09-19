import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    label: Mapped[str] = mapped_column(String(255), nullable=False)

    def __repr__(self) -> str:
        return f"<Category {self.slug}>"


class Product(Base):
    __tablename__ = "products"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    sku: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    category_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False
    )
    # Classic (non-Mapped-annotated) relationship — deliberately sidesteps
    # SQLAlchemy's annotation-introspection path entirely. We already hit a
    # real bug there (Union-type Mapped[] annotations crashing on Python
    # 3.14); this attribute avoids that code path by not being type-annotated
    # at all, which is a perfectly valid way to declare a relationship in
    # SQLAlchemy 2.0 even when every other attribute uses Mapped[].
    category = relationship("Category", backref="products")
    # Every field below is required (non-nullable) — deliberately no Optional
    # fields on this model, to stay clear of that same bug's territory.
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    specs: Mapped[dict] = mapped_column(JSONB, nullable=False, default=dict)
    image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    stock_quantity: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<Product {self.sku} ({self.slug})>"
