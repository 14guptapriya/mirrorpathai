from sqlalchemy import Column, Integer, Text, ForeignKey
from app.db.base import Base

class AlumniJourney(Base):
    __tablename__ = "alumni_journeys"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    student_identity = Column(Text)
    motivations = Column(Text)
    challenges = Column(Text)
    key_experiences = Column(Text)
    turning_point = Column(Text)
    advice_to_younger_self = Column(Text)
    career_reflection = Column(Text)