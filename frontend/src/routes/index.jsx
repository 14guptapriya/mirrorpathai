import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute, RoleGuard, OnboardingGuard } from './RouteGuards';

// Pages
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import StudentProfile from '../pages/StudentProfile';
import StudentOnboarding from '../pages/StudentOnboarding';
import IdentityGeneration from '../pages/IdentityGeneration';
import StudentDashboard from '../pages/StudentDashboard';
import StudentMatching from '../pages/StudentMatching';
import AlumniProfile from '../pages/AlumniProfile';
import AlumniJourney from '../pages/AlumniJourney';
import AlumniDashboard from '../pages/AlumniDashboard';

// Layout wrappers (used within views directly or in routes)
import PublicLayout from '../layouts/PublicLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Protected Routes */}
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="student">
              <OnboardingGuard requiredStep="profile">
                <StudentProfile />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/onboarding"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="student">
              <OnboardingGuard requiredStep="details">
                <StudentOnboarding />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/identity"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="student">
              <OnboardingGuard requiredStep="identity">
                <IdentityGeneration />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="student">
              <OnboardingGuard requiredStep="dashboard">
                <StudentDashboard />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/matching"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="student">
              <OnboardingGuard requiredStep="dashboard">
                <StudentMatching />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Alumni Protected Routes */}
      <Route
        path="/alumni/profile"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="alumni">
              <OnboardingGuard requiredStep="profile">
                <AlumniProfile />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/journey"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="alumni">
              <OnboardingGuard requiredStep="details">
                <AlumniJourney />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/identity"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="alumni">
              <OnboardingGuard requiredStep="identity">
                <IdentityGeneration />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRole="alumni">
              <OnboardingGuard requiredStep="dashboard">
                <AlumniDashboard />
              </OnboardingGuard>
            </RoleGuard>
          </ProtectedRoute>
        }
      />

      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
