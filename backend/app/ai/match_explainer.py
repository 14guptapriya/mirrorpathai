from app.ai.groq_client import client


def explain_match(
    student_identity: str,
    alumni_identity: str
):
    prompt = f"""
    Compare the student and alumni profiles.

    Student:
    {student_identity}

    Alumni:
    {alumni_identity}

    Explain:
    - Why they are a good match
    - Shared interests
    - Shared goals
    - What the student can learn

    Keep it under 100 words.
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content