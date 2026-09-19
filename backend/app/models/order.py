import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class OrderStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    fulfilled = "fulfilled"
    cancelled = "cancelled"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
    status: Mapped[OrderStatus] = mapped_column(
        Enum(OrderStatus, name="order_status"), nullable=False, default=OrderStatus.pending
    )
    shipping_name: Mapped[str] = mapped_column(String(255), nullable=False)
    shipping_phone: Mapped[str] = mapped_column(String(50), nullable=False)
    shipping_address: Mapped[str] = mapped_column(String(500), nullable=False)
    shipping_county: Mapped[str] = mapped_column(String(100), nullable=False)
    subtotal: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    shipping_fee: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    total: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    # Set once Phase 23 initializes a Paystack transaction for this order.
    # Mapped[str] (not Optional[str]) + nullable=True + a Python-side default
    # of "" — same pattern as company_name on User, avoiding the Union bug.
    payment_reference: Mapped[str] = mapped_column(String(255), nullable=True, default="")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    items = relationship("OrderItem", backref="order", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Order {self.id} ({self.status.value})>"


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    order_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("orders.id"), nullable=False
    )
    product_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("products.id"), nullable=False
    )
    # Name and price are snapshotted at purchase time — if the product's
    # real name/price changes later, past orders should still show what was
    # actually bought and paid for, not today's catalog values.
    product_name: Mapped[str] = mapped_column(String(255), nullable=False)
    unit_price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
    line_total: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)

    def __repr__(self) -> str:
        return f"<OrderItem {self.product_name} x{self.quantity}>"
