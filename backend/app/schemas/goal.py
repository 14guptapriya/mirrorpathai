from datetime import date
from pydantic import BaseModel


class GoalCreate(BaseModel):

    goal_title: str

    goal_description: str | None = None

    target_date: date | None = None


class GoalResponse(BaseModel):

    id: int

    user_id: int

    goal_title: str

    goal_description: str | None = None

    status: str

    target_date: date | None = None

    class Config:
        from_attributes = True
