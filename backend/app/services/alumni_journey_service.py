from app.models.alumnis_journey import AlumniJourney

def create_journey(db, user_id, data):

    existing_journey = db.query(AlumniJourney).filter(
        AlumniJourney.user_id == user_id
    ).first()

    if existing_journey:
        raise Exception("Journey already exists")

    db_journey = AlumniJourney(
        user_id=user_id,
        **data.model_dump()
    )

    db.add(db_journey)
    db.commit()
    db.refresh(db_journey)

    return db_journey


def get_journey(db, user_id):

    return db.query(AlumniJourney).filter(
        AlumniJourney.user_id == user_id
    ).first()