from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.core.rate_limit import rate_limiter
from app.crud.lead import create_lead, list_leads
from app.db.session import get_db
from app.models.user import UserRole
from app.schemas.lead import LeadCreate, LeadRead

router = APIRouter(prefix="/api/leads", tags=["leads"])


@router.post(
    "",
    response_model=LeadRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limiter("leads", max_attempts=10, window_seconds=3600))],
)
def submit_lead(lead_in: LeadCreate, db: Session = Depends(get_db)):
    """Public endpoint — the contact form on the marketing site posts here.
    Rate-limited (10/hour/IP) since it's open to anonymous visitors."""
    lead = create_lead(db, lead_in)
    return LeadRead.model_validate(lead)


@router.get(
    "",
    response_model=list[LeadRead],
    dependencies=[Depends(require_role(UserRole.staff, UserRole.admin))],
)
def get_leads(db: Session = Depends(get_db)):
    """First real use of require_role, defined back in Phase 10 — customer
    accounts get a 403 here, staff/admin get the list."""
    return [LeadRead.model_validate(lead) for lead in list_leads(db)]
