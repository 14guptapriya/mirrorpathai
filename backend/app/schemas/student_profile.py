from pydantic import BaseModel

class StudentProfileCreate(BaseModel):
    #user_id: int
    college_name: str
    degree: str
    department: str
    year_of_study: int
    linkedin_url: str | None = None
    github_url: str | None = None