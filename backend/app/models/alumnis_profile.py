from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class AlumniProfile(Base):
    __tablename__ = "alumni_profiles"

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

    graduation_year = Column(Integer, nullable=False)

    current_designation = Column(String, nullable=False)
    current_company = Column(String, nullable=False)
    industry = Column(String, nullable=False)

    years_of_experience = Column(Integer, nullable=False)

    linkedin_url = Column(String, nullable=True)