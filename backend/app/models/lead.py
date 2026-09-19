import enum
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class LeadInterest(str, enum.Enum):
    restaurants = "restaurants"
    hotels = "hotels"
    golfclubs = "golfclubs"
    bars = "bars"
    smes = "smes"
    other = "other"


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    # Mapped[str], not Mapped[Optional[str]] — see the comment in
    # app/models/user.py. Optional[]/`| None` are both Union types, and
    # SQLAlchemy 2.0.31 crashes resolving any Union annotation on Python
    # 3.14. nullable=True below still makes this column nullable in Postgres.
    phone: Mapped[str] = mapped_column(String(50), nullable=True)
    interest: Mapped[LeadInterest] = mapped_column(
        Enum(LeadInterest, name="lead_interest"), nullable=False
    )
    message: Mapped[str] = mapped_column(Text, nullable=False)
    # Nullable — anonymous visitors can submit the contact form without an account.
    created_by_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<Lead {self.email} ({self.interest.value})>"
