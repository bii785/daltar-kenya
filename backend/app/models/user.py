import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class UserRole(str, enum.Enum):
    customer = "customer"
    staff = "staff"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    # Generated in Python (not DB-side) so no Postgres extension
    # (pgcrypto/uuid-ossp) needs to be enabled on Neon.
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    # Annotated as Mapped[str], NOT Mapped[Optional[str]] / Mapped[str | None].
    # SQLAlchemy 2.0.31 crashes resolving ANY Union-type annotation on Python
    # 3.14 — Optional[] and | None are both unions, so both hit the bug.
    # The explicit nullable=True below still makes this column nullable in
    # the actual database; only the Python-side type hint is simplified.
    company_name: Mapped[str] = mapped_column(String(255), nullable=True)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role"), nullable=False, default=UserRole.customer
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<User {self.email} ({self.role.value})>"
