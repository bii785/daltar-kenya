import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CategoryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    slug: str
    label: str


class ProductRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    sku: str
    slug: str
    name: str
    category: CategoryRead
    price: float
    description: str
    specs: dict[str, str]
    image_url: str
    stock_quantity: int
    is_active: bool
    created_at: datetime


class ProductCreate(BaseModel):
    sku: str
    slug: str
    name: str
    category_id: uuid.UUID
    price: float
    description: str
    specs: dict[str, str] = {}
    image_url: str
    stock_quantity: int = 0


# All fields optional here is fine — this is a Pydantic schema, not an ORM
# Mapped[] annotation, so it's unrelated to the Union-annotation bug we hit
# on the models. Only editing what's provided (exclude_unset in the CRUD
# layer) is exactly what a partial update endpoint needs.
class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = None
    description: str | None = None
    specs: dict[str, str] | None = None
    image_url: str | None = None
    stock_quantity: int | None = None
    is_active: bool | None = None
