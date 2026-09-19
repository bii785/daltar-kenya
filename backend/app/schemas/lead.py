import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.lead import LeadInterest


class LeadCreate(BaseModel):
    name: str = Field(min_length=1)
    email: EmailStr
    phone: str | None = None
    interest: LeadInterest
    message: str = Field(min_length=1)


class LeadRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    email: EmailStr
    phone: str | None
    interest: LeadInterest
    message: str
    created_at: datetime
