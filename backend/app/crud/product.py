import uuid

from sqlalchemy.orm import Session, joinedload

from app.models.product import Category, Product
from app.schemas.product import ProductCreate, ProductUpdate


def list_categories(db: Session) -> list[Category]:
    return db.query(Category).order_by(Category.label).all()


def list_products(db: Session, category_slug: str = "") -> list[Product]:
    query = (
        db.query(Product)
        .options(joinedload(Product.category))
        .filter(Product.is_active.is_(True))
    )
    if category_slug:
        query = query.join(Category).filter(Category.slug == category_slug)
    return query.order_by(Product.name).all()


def get_product_by_slug(db: Session, slug: str) -> Product | None:
    return (
        db.query(Product)
        .options(joinedload(Product.category))
        .filter(Product.slug == slug, Product.is_active.is_(True))
        .first()
    )


def list_all_products(db: Session) -> list[Product]:
    """Includes inactive/out-of-stock products — for staff/admin management,
    not the public catalog (list_products above filters to active only)."""
    return db.query(Product).options(joinedload(Product.category)).order_by(Product.name).all()


def create_product(db: Session, product_in: ProductCreate) -> Product:
    product = Product(**product_in.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update_product(
    db: Session, product_id: uuid.UUID, product_in: ProductUpdate
) -> Product | None:
    product = db.get(Product, product_id)
    if not product:
        return None
    for field, value in product_in.model_dump(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    db.refresh(product)
    return product
