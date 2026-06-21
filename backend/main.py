from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine
from app.db.base import Base

from app.models.user import User
from app.models.students_response import StudentResponse
from app.models.alumnis_profile import AlumniProfile
from app.models.alumnis_journey import AlumniJourney
from app.models.alumnis_update import AlumniUpdate
from app.models.students_profile import StudentProfile
from app.models.student_identity_profile import StudentIdentityProfile
from app.models.alumni_identity_profile import AlumniIdentityProfile
from app.models.student_goal import StudentGoal
from app.routers.auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MirrorPathAI API",
    version="1.0.0",
    description="Backend API for MirrorPathAI"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root
@app.get("/")
def root():
     return {
        "message": "Welcome to MirrorPathAI Backend 🚀"
    }

from app.routers import onboarding

app.include_router(onboarding.router)


from app.routers import (
    student_profile,
    alumni_profile,
    alumni_journey,
    alumni_update,
    goals
)

app.include_router(student_profile.router)
app.include_router(alumni_profile.router)
app.include_router(alumni_journey.router)
app.include_router(alumni_update.router)
app.include_router(goals.router)

from app.routers import  identity
app.include_router(identity.router)
   

# Health Check
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# Routers
app.include_router(auth_router)

from app.routers import matching

app.include_router(
    matching.router
)

