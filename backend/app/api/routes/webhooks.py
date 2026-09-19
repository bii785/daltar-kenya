import uuid

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.paystack import verify_webhook_signature
from app.crud.order import get_order
from app.db.session import get_db
from app.models.order import OrderStatus
from app.models.product import Product

router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])


@router.post("/paystack", status_code=status.HTTP_200_OK)
async def paystack_webhook(
    request: Request,
    x_paystack_signature: str = Header(default=""),
    db: Session = Depends(get_db),
):
    raw_body = await request.body()

    if not verify_webhook_signature(raw_body, x_paystack_signature):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid signature")

    payload = await request.json()
    event = payload.get("event")

    if event == "charge.success":
        reference = payload["data"]["reference"]
        try:
            order = get_order(db, uuid.UUID(reference))
        except ValueError:
            order = None

        if order and order.status == OrderStatus.pending:
            order.status = OrderStatus.paid
            # Stock is committed here, at confirmed payment — not at order
            # creation. See the comment in crud/order.py for why: an unpaid,
            # abandoned order shouldn't lock up real inventory.
            for item in order.items:
                product = db.get(Product, item.product_id)
                if product:
                    product.stock_quantity = max(product.stock_quantity - item.quantity, 0)
            db.commit()

    return {"status": "ok"}
