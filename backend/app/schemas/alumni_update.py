from datetime import datetime
from pydantic import BaseModel


class AlumniUpdateCreate(BaseModel):

    user_id: int

    current_designation: str
    current_company: str

    career_changes: str | None = None
    new_learnings: str | None = None
    career_perspective: str | None = None
    advice_for_students: str | None = None
    industry_changes: str | None = None


class AlumniUpdateResponse(BaseModel):
    id: int
    user_id: int
    current_designation: str
    current_company: str
    career_changes: str | None = None
    new_learnings: str | None = None
    career_perspective: str | None = None
    advice_for_students: str | None = None
    industry_changes: str | None = None
    created_at: datetime | None = None

    class Config:
        orm_mode = True