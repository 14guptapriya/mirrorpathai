import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; // { access_token, token_type }
  },

  register: async (name, email, password, role) => {
    const response = await api.post('/auth/register', { name, email, password, role });
    return response.data; // { message, user_id }
  },

  me: async () => {
    const response = await api.get('/auth/me');
    return response.data; // { id, name, email, role }
  }
};

export const studentService = {
  saveProfile: async (profileData) => {
    const response = await api.post('/student/profile/', {
      college_name: profileData.collegeName,
      degree: profileData.degree,
      department: profileData.department,
      year_of_study: parseInt(profileData.yearOfStudy, 10),
      linkedin_url: profileData.linkedinUrl || null,
      github_url: profileData.githubUrl || null
    });
    return response.data;
  },

  fetchProfile: async () => {
    const response = await api.get('/student/profile/me');
    return response.data; // StudentProfile or null
  },

  submitOnboarding: async (answers) => {
    // answers format: [{ question_number, question, answer }]
    const response = await api.post('/onboarding/submit', {
      responses: answers.map(item => ({
        question_number: item.questionNumber,
        question: item.question,
        answer: item.answer
      }))
    });
    return response.data;
  },

  generateIdentity: async (userId) => {
    const response = await api.post('/identity/student/');
    const result = response.data; // { message, identity }
    if (result && result.identity) {
      localStorage.setItem(`identity_${userId}`, result.identity);
    }
    return result;
  },

  getCachedIdentity: (userId) => {
    return localStorage.getItem(`identity_${userId}`);
  },

  clearCachedIdentity: (userId) => {
    localStorage.removeItem(`identity_${userId}`);
  },

  fetchMatches: async () => {
    const response = await api.get('/matching/student');
    return response.data; // { matches: [{ user_id, company, designation, score, reason }] }
  }
};

export const alumniService = {
  saveProfile: async (profileData) => {
  const response = await api.post('/alumni/profile/', profileData);
  return response.data;
},

  fetchProfile: async () => {
    const response = await api.get('/alumni/profile/me');
    return response.data; // AlumniProfile or null
  },

  saveJourney: async (journeyData) => {
   
  const response = await api.post('/alumni/journey/', journeyData);
  return response.data;
},

  fetchJourney: async () => {
    const response = await api.get('/alumni/journey/me');
    return response.data; // AlumniJourney or null
  },

  generateIdentity: async (userId) => {
    const response = await api.post('/identity/alumni/');
    const result = response.data; // { message, identity }
    if (result && result.identity) {
      localStorage.setItem(`identity_${userId}`, result.identity);
    }
    return result;
  },

  getCachedIdentity: (userId) => {
    return localStorage.getItem(`identity_${userId}`);
  },

  clearCachedIdentity: (userId) => {
    localStorage.removeItem(`identity_${userId}`);
  },

  fetchUpdates: async (userId) => {
    const response = await api.get(`/alumni/update/${userId}`);
    return response.data; // list of updates
  },

  submitUpdate: async (updateText) => {
    const response = await api.post('/alumni/update/', {
      update_text: updateText
    });
    return response.data;
  }
};
