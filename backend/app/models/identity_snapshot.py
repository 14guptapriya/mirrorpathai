from sqlalchemy import Column, Integer, JSON, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.db.base import Base

class IdentitySnapshot(Base):
    __tablename__ = "identity_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    summary = Column(Text)

    interests = Column(JSON)
    motivations = Column(JSON)
    values = Column(JSON)
    challenges = Column(JSON)
    aspirations = Column(JSON)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())