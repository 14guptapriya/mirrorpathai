from app.models.student_identity_profile import StudentIdentityProfile
from app.models.alumni_identity_profile import AlumniIdentityProfile
from app.models.alumnis_profile import AlumniProfile

from app.ai.embedding_service import generate_embedding
from app.ai.pinecone_service import search_alumni_matches
from app.ai.match_explainer import explain_match


def find_matches_for_student(
    db,
    user_id: int,
    top_k: int = 5
):
    # Get student's generated identity
    student_identity = (
        db.query(StudentIdentityProfile)
        .filter(
            StudentIdentityProfile.user_id == user_id
        )
        .first()
    )

    if not student_identity:
        raise Exception(
            "Student identity profile not found."
        )

    # Generate query embedding
    embedding = generate_embedding(
        student_identity.profile_text
    )

    # Search Pinecone
    matches = search_alumni_matches(
        embedding,
        top_k
    )
    final_matches = []

    for match in matches:

        alumni_user_id = match["metadata"]["user_id"]

        alumni_profile = (
        db.query(AlumniProfile)
        .filter(
            AlumniProfile.user_id == alumni_user_id
        )
        .first()
    )

        alumni_identity = (
        db.query(AlumniIdentityProfile)
        .filter(
            AlumniIdentityProfile.user_id == alumni_user_id
        )
        .first()
    )

        reason = explain_match(
        student_identity.profile_text,
        alumni_identity.profile_text
    )

        final_matches.append({
        "user_id": alumni_user_id,
        "company": alumni_profile.current_company,
        "designation": alumni_profile.current_designation,
        "score": round(match["score"], 3),
        "reason": reason
    })

    return final_matches
