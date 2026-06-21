from pydantic import BaseModel

class AlumniJourneyCreate(BaseModel):
    #user_id: int

    student_identity: str
    motivations: str
    challenges: str
    key_experiences: str
    turning_point: str
    advice_to_younger_self: str
    career_reflection: str