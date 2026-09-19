import uuid
from decimal import Decimal

from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product
from app.schemas.order import OrderCreate

# Flat-rate shipping for v1 — deliberately simple. Swapping this for a
# per-county table later only touches this one constant/function, not the
# route, schema, or frontend checkout flow.
FLAT_SHIPPING_FEE = Decimal("1500.00")


def create_order(db: Session, user_id: uuid.UUID, order_in: OrderCreate) -> Order:
    """Re-validates price and stock server-side — the frontend's cart total
    is never trusted directly. Deliberately does NOT decrement stock here:
    this order starts as 'pending', and stock is only committed once Phase
    23's payment webhook confirms the order actually got paid for. Otherwise
    an abandoned, unpaid cart could lock up real inventory."""
    subtotal = Decimal("0.00")
    order_items: list[OrderItem] = []

    for item_in in order_in.items:
        product = db.get(Product, item_in.product_id)
        if not product or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product {item_in.product_id} is not available",
            )
        if product.stock_quantity < item_in.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Not enough stock for {product.name} "
                    f"(requested {item_in.quantity}, available {product.stock_quantity})"
                ),
            )

        line_total = Decimal(str(product.price)) * item_in.quantity
        subtotal += line_total
        order_items.append(
            OrderItem(
                product_id=product.id,
                product_name=product.name,
                unit_price=product.price,
                quantity=item_in.quantity,
                line_total=line_total,
            )
        )

    total = subtotal + FLAT_SHIPPING_FEE

    order = Order(
        user_id=user_id,
        shipping_name=order_in.shipping_name,
        shipping_phone=order_in.shipping_phone,
        shipping_address=order_in.shipping_address,
        shipping_county=order_in.shipping_county,
        subtotal=subtotal,
        shipping_fee=FLAT_SHIPPING_FEE,
        total=total,
        items=order_items,
    )
    db.add(order)
    db.commit()
    db.refresh(order)
    return order


def get_order(db: Session, order_id: uuid.UUID) -> Order | None:
    return (
        db.query(Order).options(joinedload(Order.items)).filter(Order.id == order_id).first()
    )


def list_orders_for_user(db: Session, user_id: uuid.UUID) -> list[Order]:
    return (
        db.query(Order)
        .options(joinedload(Order.items))
        .filter(Order.user_id == user_id)
        .order_by(Order.created_at.desc())
        .all()
    )


def list_all_orders(db: Session) -> list[Order]:
    return (
        db.query(Order).options(joinedload(Order.items)).order_by(Order.created_at.desc()).all()
    )


def update_order_status(db: Session, order_id: uuid.UUID, new_status: OrderStatus) -> Order | None:
    order = get_order(db, order_id)
    if not order:
        return None
    order.status = new_status
    db.commit()
    db.refresh(order)
    return order
