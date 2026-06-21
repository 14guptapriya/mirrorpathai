from pinecone import Pinecone

from app.core.config import settings


pc = Pinecone(
    api_key=settings.PINECONE_API_KEY
)

index = pc.Index(
    settings.PINECONE_INDEX_NAME
)


def upsert_alumni_embedding(
    user_id,
    embedding
):
    index.upsert(
        vectors=[
            {
                "id": f"alumni_{user_id}",
                "values": embedding,
                "metadata": {
                    "user_id": user_id,
                    "type": "alumni"
                }
            }
        ]
    )


def upsert_student_embedding(
    user_id,
    embedding
):
    index.upsert(
        vectors=[
            {
                "id": f"student_{user_id}",
                "values": embedding,
                "metadata": {
                    "user_id": user_id,
                    "type": "student"
                }
            }
        ]
    )


def search_alumni_matches(
    embedding,
    top_k=5
):
    results = index.query(
        vector=embedding,
        top_k=top_k,
        include_metadata=True,
        filter={
            "type": "alumni"
        }
    )

    matches = []

    for match in results.matches:
        matches.append(
            {
                "id": match.id,
                "score": float(match.score),
                "metadata": match.metadata
            }
        )

    return matches