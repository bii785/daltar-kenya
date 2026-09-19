import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.crud.order import list_all_orders, update_order_status
from app.crud.product import create_product, list_all_products, update_product
from app.db.session import get_db
from app.models.user import UserRole
from app.schemas.order import OrderRead, OrderStatusUpdate
from app.schemas.product import ProductCreate, ProductRead, ProductUpdate

# Every route in this router requires staff or admin — enforced once here
# via the router-level dependency rather than repeated on each endpoint.
router = APIRouter(
    prefix="/api/admin",
    tags=["admin"],
    dependencies=[Depends(require_role(UserRole.staff, UserRole.admin))],
)


@router.get("/products", response_model=list[ProductRead])
def get_all_products(db: Session = Depends(get_db)):
    """Includes inactive/out-of-stock products, unlike the public
    GET /api/products which only shows what customers should see."""
    return list_all_products(db)


@router.post("/products", response_model=ProductRead, status_code=status.HTTP_201_CREATED)
def add_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    return create_product(db, product_in)


@router.patch("/products/{product_id}", response_model=ProductRead)
def edit_product(product_id: uuid.UUID, product_in: ProductUpdate, db: Session = Depends(get_db)):
    product = update_product(db, product_id, product_in)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.get("/orders", response_model=list[OrderRead])
def get_all_orders(db: Session = Depends(get_db)):
    return list_all_orders(db)


@router.patch("/orders/{order_id}/status", response_model=OrderRead)
def set_order_status(
    order_id: uuid.UUID, status_in: OrderStatusUpdate, db: Session = Depends(get_db)
):
    order = update_order_status(db, order_id, status_in.status)
    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return order
