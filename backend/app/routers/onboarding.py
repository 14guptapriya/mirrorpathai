from fastapi import APIRouter, Depends
from app.services.student_profile_service import get_student_profile
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.models.user import User

from app.schemas.student import OnboardingSubmission
from app.services.onboarding_service import save_responses
from app.db.session import get_db
from app.models.students_response import StudentResponse

router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"]
)


@router.post("/submit")
def submit_onboarding(
    data: OnboardingSubmission,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return save_responses(
        db,
        current_user.id,
        data
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