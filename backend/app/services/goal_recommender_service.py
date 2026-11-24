from app.ai.goal_recommender import generate_goal_recommendations
from app.models.student_identity_profile import StudentIdentityProfile
from app.models.alumni_identity_profile import AlumniIdentityProfile
from app.models.alumnis_profile import AlumniProfile
#from mirrorpathai.backend.app.models.alumni_identity_profile import AlumniIdentityProfilee
from app.models.user import User

def get_recommendations(db, student_id, alumni_id):

    student = db.query(StudentIdentityProfile).filter(
        StudentIdentityProfile.user_id == student_id
    ).first()

    alumni = db.query(AlumniIdentityProfile).filter(
        AlumniIdentityProfile.user_id == alumni_id
    ).first()

    alumni_profile = db.query(AlumniProfile).filter(
        AlumniProfile.user_id == alumni_id
    ).first()

    return generate_goal_recommendations(
        student.profile_text,
        alumni.profile_text,
        alumni_profile.current_designation,
        alumni_profile.current_company
    )