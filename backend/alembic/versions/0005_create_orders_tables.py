"""create orders and order_items tables

Revision ID: 0005
Revises: 0004
Create Date: 2026-09-17

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0005"
down_revision = "0004"
branch_labels = None
depends_on = None

order_status = postgresql.ENUM("pending", "paid", "fulfilled", "cancelled", name="order_status")


def upgrade() -> None:
    bind = op.get_bind()
    order_status.create(bind, checkfirst=True)

    op.create_table(
        "orders",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("status", order_status, nullable=False, server_default="pending"),
        sa.Column("shipping_name", sa.String(length=255), nullable=False),
        sa.Column("shipping_phone", sa.String(length=50), nullable=False),
        sa.Column("shipping_address", sa.String(length=500), nullable=False),
        sa.Column("shipping_county", sa.String(length=100), nullable=False),
        sa.Column("subtotal", sa.Numeric(10, 2), nullable=False),
        sa.Column("shipping_fee", sa.Numeric(10, 2), nullable=False),
        sa.Column("total", sa.Numeric(10, 2), nullable=False),
        sa.Column("payment_reference", sa.String(length=255), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_foreign_key(
        "fk_orders_user_id_users", "orders", "users", ["user_id"], ["id"]
    )
    op.create_index("ix_orders_user_id", "orders", ["user_id"])

    op.create_table(
        "order_items",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("order_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("product_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("product_name", sa.String(length=255), nullable=False),
        sa.Column("unit_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("quantity", sa.Integer(), nullable=False),
        sa.Column("line_total", sa.Numeric(10, 2), nullable=False),
    )
    op.create_foreign_key(
        "fk_order_items_order_id_orders",
        "order_items",
        "orders",
        ["order_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "fk_order_items_product_id_products",
        "order_items",
        "products",
        ["product_id"],
        ["id"],
    )
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])


def downgrade() -> None:
    op.drop_index("ix_order_items_order_id", table_name="order_items")
    op.drop_constraint("fk_order_items_product_id_products", "order_items", type_="foreignkey")
    op.drop_constraint("fk_order_items_order_id_orders", "order_items", type_="foreignkey")
    op.drop_table("order_items")

    op.drop_index("ix_orders_user_id", table_name="orders")
    op.drop_constraint("fk_orders_user_id_users", "orders", type_="foreignkey")
    op.drop_table("orders")

    bind = op.get_bind()
    order_status.drop(bind, checkfirst=True)
