from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User

from app.schemas.alumni_journey import AlumniJourneyCreate
from app.services.alumni_journey_service import (
    create_journey,
    get_journey
)

router = APIRouter(
    prefix="/alumni/journey",
    tags=["Alumni Journey"]
)


@router.post("/")
def create_alumni_journey(
    data: AlumniJourneyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_journey(
        db,
        current_user.id,
        data
    )


@router.get("/me")
def get_alumni_journey(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_journey(
        db,
        current_user.id
    )