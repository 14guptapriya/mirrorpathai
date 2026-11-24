from app.models.alumnis_update import AlumniUpdate

def create_update(db, data):

    update = AlumniUpdate(
        **data.model_dump()
    )

    db.add(update)
    db.commit()
    db.refresh(update)

    return update


def get_updates(db, user_id):

    return db.query(
        AlumniUpdate
    ).filter(
        AlumniUpdate.user_id == user_id
    ).all()