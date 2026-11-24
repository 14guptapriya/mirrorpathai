from app.ai.groq_client import client  # whatever wrapper you use

def generate_goal_recommendations(
    student_identity: str,
    alumni_identity: str,
    designation: str,
    company: str
):
    prompt = f"""
You are an experienced career mentor.

Student Identity:
{student_identity}

Matched Alumni Identity:
{alumni_identity}

Matched Alumni Role:
{designation}

Matched Alumni Company:
{company}

Generate 5 specific career goals.

Return JSON:
{{
  "recommended_goals": [
    {{
      "title": "",
      "description": "",
      "timeline": ""
    }}
  ]
}}
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