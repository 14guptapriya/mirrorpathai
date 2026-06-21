from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.models.user import User

from app.db.session import get_db
from app.schemas.student_profile import StudentProfileCreate
from app.services.student_profile_service import (
    create_student_profile,
    get_student_profile
)

router = APIRouter(
    prefix="/student/profile",
    tags=["Student Profile"]
)




@router.post("/")
def create_profile(
    profile: StudentProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_student_profile(
        db,
        current_user.id,
        profile
    )

@router.get("/me")
def get_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_student_profile(
        db,
        current_user.id
    )