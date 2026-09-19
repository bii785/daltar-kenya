import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.config import settings
from app.core.paystack import initialize_transaction
from app.crud.order import create_order, get_order, list_orders_for_user
from app.db.session import get_db
from app.models.order import OrderStatus
from app.models.user import User, UserRole
from app.schemas.order import OrderCreate, OrderRead

router = APIRouter(prefix="/api/orders", tags=["orders"])


@router.post("", response_model=OrderRead, status_code=status.HTTP_201_CREATED)
def submit_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = create_order(db, user_id=current_user.id, order_in=order_in)
    return OrderRead.model_validate(order)


@router.get("/me", response_model=list[OrderRead])
def read_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Declared before /{order_id} — a literal path must be registered ahead
    # of a path-parameter route, or FastAPI tries to parse "me" as a UUID
    # and returns a 422 instead of ever reaching this function.
    orders = list_orders_for_user(db, current_user.id)
    return [OrderRead.model_validate(order) for order in orders]


@router.get("/{order_id}", response_model=OrderRead)
def read_order(
    order_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    is_owner = order.user_id == current_user.id
    is_staff = current_user.role in (UserRole.staff, UserRole.admin)
    if not is_owner and not is_staff:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not your order")
    return OrderRead.model_validate(order)


@router.post("/{order_id}/initialize-payment")
async def initialize_payment(
    order_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    order = get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    if order.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not your order")
    if order.status != OrderStatus.pending:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Order is not pending payment"
        )

    reference = str(order.id)
    callback_url = f"{settings.frontend_url}/orders/{order.id}"

    result = await initialize_transaction(
        email=current_user.email,
        amount_kes=float(order.total),
        reference=reference,
        callback_url=callback_url,
    )

    order.payment_reference = reference
    db.commit()

    return {"authorization_url": result["data"]["authorization_url"]}
