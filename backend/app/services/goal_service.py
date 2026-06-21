from app.models.student_goal import StudentGoal


def create_goal(

        db,

        user_id,

        goal

):


    new_goal = StudentGoal(

        user_id=user_id,

        goal_title=goal.goal_title,

        goal_description=goal.goal_description,

        target_date=goal.target_date

    )


    db.add(new_goal)

    db.commit()

    db.refresh(new_goal)


    return new_goal
