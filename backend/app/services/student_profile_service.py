from app.models.students_profile import StudentProfile

def create_student_profile(db, user_id, profile):

    db_profile = StudentProfile(
        user_id=user_id,
        **profile.model_dump()
)

    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)

    return db_profile

def get_student_profile(db, user_id):

    return db.query(StudentProfile)\
        .filter(StudentProfile.user_id == user_id)\
        .first()