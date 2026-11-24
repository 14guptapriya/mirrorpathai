from app.models.students_response import StudentResponse

def save_responses(db, user_id, submission):

    for response in submission.responses:

        db_response = StudentResponse(
            user_id=user_id,
            question_number=response.question_number,
            question=response.question,
            answer=response.answer
        )

        db.add(db_response)

    db.commit()

    return {"message": "Responses saved successfully"}