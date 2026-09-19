from sqlalchemy.orm import Session

from app.models.lead import Lead
from app.schemas.lead import LeadCreate


def create_lead(db: Session, lead_in: LeadCreate) -> Lead:
    lead = Lead(
        name=lead_in.name,
        email=lead_in.email,
        phone=lead_in.phone,
        interest=lead_in.interest,
        message=lead_in.message,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def list_leads(db: Session) -> list[Lead]:
    return db.query(Lead).order_by(Lead.created_at.desc()).all()
