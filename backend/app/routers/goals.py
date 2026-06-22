from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.models.user import User

from app.db.session import get_db

from app.schemas.goal import GoalCreate

from app.services.goal_service import create_goal


router = APIRouter(

    prefix="/goals",

    tags=["Goals"]

)


@router.post("/")
def add_goal(

    goal: GoalCreate,

    current_user: User = Depends(get_current_user),

    db: Session = Depends(get_db)

):

    return create_goal(

        db,

        current_user.id,

        goal

    )
@router.get("/")
def get_goals():
    pass
@router.delete("/{goal_id}")
def delete_goal(goal_id: int):
    pass
