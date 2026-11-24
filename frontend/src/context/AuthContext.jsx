import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, studentService, alumniService } from '../services/apiServices';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [onboardingStatus, setOnboardingStatus] = useState({
    profileCompleted: false,
    detailsCompleted: false, // Questionnaire for student, Journey for alumni
    identityCompleted: false,
    loading: true
  });

  // Automatically fetch user details when token changes
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          localStorage.setItem('token', token);
          const userData = await authService.me();
          setUser(userData);
          await refreshOnboardingStatus(userData);
        } catch (error) {
          console.error('Failed to authenticate token:', error);
          logout();
        }
      } else {
        setUser(null);
        setOnboardingStatus({
          profileCompleted: false,
          detailsCompleted: false,
          identityCompleted: false,
          loading: false
        });
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  const refreshOnboardingStatus = async (currentUser = user) => {
    if (!currentUser) return;
    
    setOnboardingStatus(prev => ({ ...prev, loading: true }));
    try {
      if (currentUser.role === 'student') {
        const profile = await studentService.fetchProfile();
        const profileCompleted = !!profile;
        
        // Check if they have answers in local storage as a fallback, or check if they have a cached identity.
        // If identity exists, everything prior is completed.
        const cachedIdentity = studentService.getCachedIdentity(currentUser.id);
        const identityCompleted = !!cachedIdentity;

        // Check if questionnaire answers have been submitted or cached
        const questionnaireDone = localStorage.getItem(`onboarding_submitted_${currentUser.id}`) === 'true' || identityCompleted;

        setOnboardingStatus({
          profileCompleted,
          detailsCompleted: questionnaireDone,
          identityCompleted,
          loading: false
        });
      } else if (currentUser.role === 'alumni') {
        const profile = await alumniService.fetchProfile();
        const profileCompleted = !!profile;

        const journey = await alumniService.fetchJourney();
        const detailsCompleted = !!journey;

        const cachedIdentity = alumniService.getCachedIdentity(currentUser.id);
        const identityCompleted = !!cachedIdentity;

        setOnboardingStatus({
          profileCompleted,
          detailsCompleted,
          identityCompleted,
          loading: false
        });
      }
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
      setOnboardingStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      setToken(data.access_token);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (name, email, password, role) => {
    setLoading(true);
    try {
      const data = await authService.register(name, email, password, role);
      // Automatically log in after registration
      const loginData = await authService.login(email, password);
      setToken(loginData.access_token);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    if (user) {
      // Retain cached identity but clear token session
    }
    setToken(null);
    setUser(null);
    setOnboardingStatus({
      profileCompleted: false,
      detailsCompleted: false,
      identityCompleted: false,
      loading: false
    });
  };

  const setOnboardingSubmitted = (statusBool) => {
    if (user) {
      localStorage.setItem(`onboarding_submitted_${user.id}`, statusBool ? 'true' : 'false');
      setOnboardingStatus(prev => ({
        ...prev,
        detailsCompleted: statusBool
      }));
    }
  };

  const setIdentityCached = (identityText) => {
    if (user) {
      if (user.role === 'student') {
        localStorage.setItem(`identity_${user.id}`, identityText);
      } else {
        localStorage.setItem(`identity_${user.id}`, identityText);
      }
      setOnboardingStatus(prev => ({
        ...prev,
        identityCompleted: true
      }));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      onboardingStatus,
      login,
      register,
      logout,
      refreshOnboardingStatus,
      setOnboardingSubmitted,
      setIdentityCached
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
