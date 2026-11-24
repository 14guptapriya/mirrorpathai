from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)
from app.services.auth_service import (
    register_user,
    login_user,
    get_current_user_details
)
from app.auth.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Register a new user.
    """
    return register_user(db, user)


@router.post("/login", response_model=TokenResponse)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db)
):
    """
    Login and receive JWT access token.
    """
    return login_user(db, credentials)


@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    """
    Get currently logged-in user's details.
    """
    return get_current_user_details(current_user)