from app.models.alumnis_profile import AlumniProfile

def create_alumni_profile(db, user_id, profile):

    existing_profile = db.query(AlumniProfile).filter(
        AlumniProfile.user_id == user_id
    ).first()

    if existing_profile:
        raise Exception("Alumni profile already exists")

    db_profile = AlumniProfile(**profile.model_dump())

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile


def get_alumni_profile(db, user_id):

    return db.query(AlumniProfile).filter(
        AlumniProfile.user_id == user_id
    ).first()