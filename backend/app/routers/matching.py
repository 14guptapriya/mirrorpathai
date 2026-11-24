from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.models.user import User
from app.db.session import get_db

from app.ai.matching_service import (
    find_matches_for_student
)

router = APIRouter(
    prefix="/matching",
    tags=["Matching"]
)


@router.get("/student")
def match_student(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    matches = find_matches_for_student(
        db,
        current_user.id
    )

    return {
        "matches": matches
    }