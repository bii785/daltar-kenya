import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.order import OrderStatus


class OrderItemCreate(BaseModel):
    product_id: uuid.UUID
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    items: list[OrderItemCreate] = Field(min_length=1)
    shipping_name: str = Field(min_length=1)
    shipping_phone: str = Field(min_length=1)
    shipping_address: str = Field(min_length=1)
    shipping_county: str = Field(min_length=1)


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


class OrderItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    product_id: uuid.UUID
    product_name: str
    unit_price: float
    quantity: int
    line_total: float


class OrderRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    status: OrderStatus
    shipping_name: str
    shipping_phone: str
    shipping_address: str
    shipping_county: str
    subtotal: float
    shipping_fee: float
    total: float
    payment_reference: str
    items: list[OrderItemRead]
    created_at: datetime
