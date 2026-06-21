from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Date,
    DateTime
)
from sqlalchemy.sql import func
from app.db.base import Base
class StudentGoal(Base):
    __tablename__ = "student_goals"
    id = Column(Integer, primary_key=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )
    goal_title = Column(
        String,
        nullable=False
    )
    goal_description = Column(
        String,
        nullable=True
    )
    status = Column(
        String,
        default="pending"
    )
    target_date = Column(
        Date,
        nullable=True
    )
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
