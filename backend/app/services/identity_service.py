from app.models.student_identity_profile import StudentIdentityProfile
from app.models.alumni_identity_profile import AlumniIdentityProfile

from app.ai.profile_builder import build_student_identity
from app.ai.profile_builder import build_alumni_identity
from app.ai.embedding_service import generate_embedding
from app.ai.pinecone_service import upsert_alumni_embedding, upsert_student_embedding


def create_student_identity_profile(
    db,
    user_id,
    profile,
    responses
):

    narrative = build_student_identity(
        profile,
        responses
    )
    print("\nIDENTITY GENERATED:\n")
    print(narrative)
    embedding = generate_embedding(
        narrative
    )
    print(f"\nEmbedding Dimension: {len(embedding)}")
    upsert_student_embedding(
        user_id,
        embedding
    )

    identity = (
        db.query(StudentIdentityProfile)
        .filter(
            StudentIdentityProfile.user_id == user_id
        )
        .first()
    )

    if identity:

        identity.profile_text = narrative

        db.commit()
        db.refresh(identity)

        return identity

    identity = StudentIdentityProfile(
        user_id=user_id,
        profile_text=narrative
    )

    db.add(identity)
    db.commit()
    db.refresh(identity)

    return identity

def create_alumni_identity_profile(
    db,
    user_id,
    profile,
    journey,
    updates=None
):
    
    narrative = build_alumni_identity(
        profile,
        journey,
        updates
    )

    embedding = generate_embedding(
    narrative
)

    upsert_alumni_embedding(
    user_id,
    embedding
)

    identity = (
        db.query(AlumniIdentityProfile)
        .filter(
            AlumniIdentityProfile.user_id == user_id
        )
        .first()
    )

    if identity:

        identity.profile_text = narrative

        db.commit()
        db.refresh(identity)

        return identity

    identity = AlumniIdentityProfile(
        user_id=user_id,
        profile_text=narrative
    )

    db.add(identity)
    db.commit()
    db.refresh(identity)

    return identity