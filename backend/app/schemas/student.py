from pydantic import BaseModel
from typing import List

class StudentAnswer(BaseModel):
    question_number: int
    question: str
    answer: str

class OnboardingSubmission(BaseModel):
    #user_id: int
    responses: List[StudentAnswer]