from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

from app.schemas.alumni_update import (
    AlumniUpdateCreate,
    AlumniUpdateResponse
)

from app.services.alumni_update_service import (
    create_update,
    get_updates
)

router = APIRouter(
    prefix="/alumni/update",
    tags=["Alumni Updates"]
)

@router.post("/", response_model=AlumniUpdateResponse)
def create_alumni_update(
    data: AlumniUpdateCreate,
    db: Session = Depends(get_db)
):
    return create_update(db, data)


@router.get("/{user_id}", response_model=list[AlumniUpdateResponse])
def fetch_updates(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_updates(db, user_id)