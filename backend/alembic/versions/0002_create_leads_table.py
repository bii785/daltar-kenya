"""create leads table

Revision ID: 0002
Revises: 0001
Create Date: 2026-08-19

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None

lead_interest = postgresql.ENUM(
    "restaurants", "hotels", "golfclubs", "bars", "smes", "other", name="lead_interest"
)


def upgrade() -> None:
    bind = op.get_bind()
    lead_interest.create(bind, checkfirst=True)

    op.create_table(
        "leads",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("interest", lead_interest, nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("created_by_user_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
    )
    op.create_foreign_key(
        "fk_leads_created_by_user_id_users",
        "leads",
        "users",
        ["created_by_user_id"],
        ["id"],
        ondelete="SET NULL",
    )
    op.create_index("ix_leads_created_at", "leads", ["created_at"])


def downgrade() -> None:
    op.drop_index("ix_leads_created_at", table_name="leads")
    op.drop_constraint("fk_leads_created_by_user_id_users", "leads", type_="foreignkey")
    op.drop_table("leads")

    bind = op.get_bind()
    lead_interest.drop(bind, checkfirst=True)
