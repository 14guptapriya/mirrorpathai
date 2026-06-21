from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.db.session import get_db
from app.services.identity_service import (
    create_student_identity_profile,
    create_alumni_identity_profile
)
from app.services.student_profile_service import get_student_profile
from app.models.students_response import StudentResponse
from app.services.alumni_profile_service import get_alumni_profile
from app.services.alumni_journey_service import get_journey
from app.services.alumni_update_service import get_updates

router = APIRouter(
    prefix="/identity",
    tags=["Identity"]
)


@router.post("/student/")
def create_student_identity(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate student identity profile
    from stored profile + questionnaire.
    """

    profile = get_student_profile(db, current_user.id)

    responses = (
        db.query(StudentResponse)
        .filter(StudentResponse.user_id == current_user.id)
        .all()
    )

    identity = create_student_identity_profile(
        db=db,
        user_id=current_user.id,
        profile=profile,
        responses=responses
    )

    return {
        "message": "Student identity generated successfully",
        "identity": identity.profile_text
    }


@router.post("/alumni/")
def create_alumni_identity(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate alumni identity profile
    from stored profile + journey.
    """

    profile = get_alumni_profile(db, current_user.id)
    journey = get_journey(db, current_user.id)
    updates = get_updates(db, current_user.id)

    identity = create_alumni_identity_profile(
        db=db,
        user_id=current_user.id,
        profile=profile,
        journey=journey,
        updates=updates
    )

    return {
        "message": "Alumni identity generated successfully",
        "identity": identity.profile_text
    }