# app/ai/profile_builder.py

from app.ai.groq_client import client


def build_student_identity(profile, responses):

    college = getattr(profile, "college", None) or getattr(profile, "college_name", "")
    degree = getattr(profile, "degree", "")
    branch = getattr(profile, "branch", None) or getattr(profile, "department", "")
    current_year = getattr(profile, "current_year", None) or getattr(profile, "year_of_study", "")
    graduation_year = getattr(profile, "graduation_year", "")
    location = getattr(profile, "location", "")

    context = f"""
    Student Basic Profile

    College: {college}
    Degree: {degree}
    Branch: {branch}
    Current Year: {current_year}
    Graduation Year: {graduation_year}
    Location: {location}

    Student Responses:
    """

    for response in responses:
        context += f"\nQuestion: {response.question}"
        context += f"\nAnswer: {response.answer}\n"

    prompt = f"""
    You are an identity analyst.

    Create a professional student identity profile.

    Focus on:
    - interests
    - motivations
    - strengths
    - aspirations
    - challenges

    Write 1-2 concise paragraphs.

    {context}
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


def build_alumni_identity(profile, journey, updates=None):

    college = getattr(profile, "college", None) or getattr(profile, "college_name", "")
    degree = getattr(profile, "degree", "")
    branch = getattr(profile, "branch", None) or getattr(profile, "department", "")
    graduation_year = getattr(profile, "graduation_year", "") or getattr(profile, "graduation_year", "")
    current_company = getattr(profile, "current_company", None) or getattr(profile, "current_company", None) or getattr(profile, "current_company", "")
    current_designation = getattr(profile, "current_designation", "")
    location = getattr(profile, "location", "")

    context = f"""
    Alumni Basic Profile

    College: {college}
    Degree: {degree}
    Branch: {branch}
    Graduation Year: {graduation_year}

    Current Company: {current_company}
    Current Designation: {current_designation}
    Location: {location}

    Alumni Journey:
    """

    if journey:
        for field, value in journey.__dict__.items():
            if field.startswith("_"):
                continue
            context += f"\n{field}: {value}"

    if updates:

        context += "\n\nCareer Updates:\n"

        for update in updates:
            context += f"\n{update.update_text}"

    prompt = f"""
    You are an identity analyst.

    Create a professional alumni identity profile.

    Focus on:
    - career journey
    - major turning points
    - challenges overcome
    - strengths developed
    - current role
    - satisfaction with career path
    - advice for students
    - future aspirations

    Write 2 concise paragraphs.

    {context}
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