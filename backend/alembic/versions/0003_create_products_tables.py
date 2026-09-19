"""create categories and products tables

Revision ID: 0003
Revises: 0002
Create Date: 2026-09-16

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "categories",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("slug", sa.String(length=100), nullable=False),
        sa.Column("label", sa.String(length=255), nullable=False),
    )
    op.create_unique_constraint("uq_categories_slug", "categories", ["slug"])

    op.create_table(
        "products",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("sku", sa.String(length=100), nullable=False),
        sa.Column("slug", sa.String(length=255), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("category_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("specs", postgresql.JSONB(), nullable=False, server_default="{}"),
        sa.Column("image_url", sa.String(length=500), nullable=False),
        sa.Column("stock_quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_unique_constraint("uq_products_sku", "products", ["sku"])
    op.create_index("ix_products_slug", "products", ["slug"], unique=True)
    op.create_foreign_key(
        "fk_products_category_id_categories",
        "products",
        "categories",
        ["category_id"],
        ["id"],
    )


def downgrade() -> None:
    op.drop_constraint("fk_products_category_id_categories", "products", type_="foreignkey")
    op.drop_index("ix_products_slug", table_name="products")
    op.drop_constraint("uq_products_sku", "products", type_="unique")
    op.drop_table("products")

    op.drop_constraint("uq_categories_slug", "categories", type_="unique")
    op.drop_table("categories")
