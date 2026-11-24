import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute: Ensures user is logged in
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// RoleGuard: Restricts route access to student or alumni roles only
export const RoleGuard = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== allowedRole) {
    // Redirect inappropriate role access to their respective start
    return user.role === 'student'
      ? <Navigate to="/student/dashboard" replace />
      : <Navigate to="/alumni/dashboard" replace />;
  }

  return children;
};

// OnboardingGuard: Restricts access to later steps in the onboarding/dashboard flow
export const OnboardingGuard = ({ children, requiredStep }) => {
  const { user, onboardingStatus } = useAuth();
  const location = useLocation();

  if (onboardingStatus.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  const { profileCompleted, detailsCompleted, identityCompleted } = onboardingStatus;
  const isStudent = user.role === 'student';

  // Determine the correct route they should be on
  let correctPath = '';
  if (!profileCompleted) {
    correctPath = isStudent ? '/student/profile' : '/alumni/profile';
  } else if (!detailsCompleted) {
    correctPath = isStudent ? '/student/onboarding' : '/alumni/journey';
  } else if (!identityCompleted) {
    correctPath = isStudent ? '/student/identity' : '/alumni/identity';
  } else {
    correctPath = isStudent ? '/student/dashboard' : '/alumni/dashboard';
  }

  // If they are on a later step than they should be, redirect them back to the correct path
  const steps = ['profile', 'details', 'identity', 'dashboard'];
  const currentStepIndex = steps.indexOf(requiredStep);
  
  let allowedStepIndex = 0;
  if (profileCompleted) allowedStepIndex = 1;
  if (profileCompleted && detailsCompleted) allowedStepIndex = 2;
  if (profileCompleted && detailsCompleted && identityCompleted) allowedStepIndex = 3;

  if (currentStepIndex > allowedStepIndex) {
    // Attempting to access a gated future page, redirect to active onboarding step
    return <Navigate to={correctPath} replace />;
  }

  // If accessing dashboard and it is completed, allow.
  // If accessing onboarding pages (like profile) even after completion, we can allow it for editing, but dashboard is only for fully onboarded.
  if (requiredStep === 'dashboard' && allowedStepIndex < 3) {
    return <Navigate to={correctPath} replace />;
  }

  return children;
};
