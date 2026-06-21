from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.db.base import Base

class AlumniUpdate(Base):
    __tablename__ = "alumni_updates"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    current_designation = Column(String, nullable=False)
    current_company = Column(String, nullable=False)

    career_changes = Column(Text)
    new_learnings = Column(Text)
    career_perspective = Column(Text)
    advice_for_students = Column(Text)
    industry_changes = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )