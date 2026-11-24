import api from './api';

export const goalService = {
  /**
   * Fetch AI-generated goal recommendations for a matched alumni.
   * The backend returns a raw JSON string from the LLM — we parse it defensively.
   * Expected parsed shape: { recommended_goals: [{ title, description, timeline }] }
   */
  fetchRecommendations: async (alumniId) => {
    const response = await api.get('/goals/recommend', {
      params: { alumni_id: alumniId }
    });

    // The backend returns completion.choices[0].message.content as a raw string.
    // It may be a plain JSON string, or wrapped in markdown code fences by the LLM.
    let rawText = response.data;

    // If FastAPI already parsed it into an object, use it directly
    if (typeof rawText === 'object' && rawText !== null) {
      return rawText;
    }

    // Strip markdown code fences if the LLM wrapped the JSON
    if (typeof rawText === 'string') {
      rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }

    return JSON.parse(rawText);
  },

  /**
   * Save a student goal.
   * Request body: { goal_title, goal_description, target_date }
   */
  saveGoal: async ({ goal_title, goal_description, target_date }) => {
    const response = await api.post('/goals/', {
      goal_title,
      goal_description,
      target_date
    });
    return response.data;
  }
};
