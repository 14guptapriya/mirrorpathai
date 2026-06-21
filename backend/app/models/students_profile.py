from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    college_name = Column(String, nullable=False)
    degree = Column(String, nullable=False)
    department = Column(String, nullable=False)
    year_of_study = Column(Integer, nullable=False)

    linkedin_url = Column(String, nullable=True)
    github_url = Column(String, nullable=True)