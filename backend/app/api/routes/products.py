from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.crud.product import get_product_by_slug, list_categories, list_products
from app.db.session import get_db
from app.schemas.product import CategoryRead, ProductRead

router = APIRouter(prefix="/api", tags=["catalog"])


@router.get("/categories", response_model=list[CategoryRead])
def get_categories(db: Session = Depends(get_db)):
    return list_categories(db)


@router.get("/products", response_model=list[ProductRead])
def get_products(
    category: str = Query("", description="Filter by category slug, e.g. 'pos-hardware'"),
    db: Session = Depends(get_db)
):
    return list_products(db, category_slug=category)


@router.get("/products/{slug}", response_model=ProductRead)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = get_product_by_slug(db, slug)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product
