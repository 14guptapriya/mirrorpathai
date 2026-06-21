from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.auth.dependencies import get_current_user
from app.models.user import User

from app.schemas.alumni_profile import AlumniProfileCreate
from app.services.alumni_profile_service import (
    create_alumni_profile,
    get_alumni_profile
)

router = APIRouter(
    prefix="/alumni/profile",
    tags=["Alumni Profile"]
)


@router.post("/")
def create_profile(
    profile: AlumniProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_alumni_profile(
        db,
        current_user.id,
        profile
    )


@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_alumni_profile(
        db,
        current_user.id
    )