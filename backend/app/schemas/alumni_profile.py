from pydantic import BaseModel

class AlumniProfileCreate(BaseModel):
    #user_id: int
    college_name: str
    degree: str
    department: str
    graduation_year: int

    current_designation: str
    current_company: str
    industry: str
    years_of_experience: int

    linkedin_url: str | None = None