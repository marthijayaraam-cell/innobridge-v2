import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollProgressBar from './components/ScrollProgressBar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import InnovationFeedPage from './pages/InnovationFeedPage';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './context/AuthContext';
import AIMentorWidget from './components/AIMentorWidget';

import logoImg from './assets/logo.svg';

import IntroAnimation from './components/IntroAnimation';
import Footer from './components/Footer';

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center text-slate-400 text-xs font-medium">
        <img src={logoImg} alt="InnoBridge Logo" className="w-10 h-10 object-contain rounded-md mb-3 animate-pulse" />
        <span>Loading InnoBridge Workspace...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length > 0 && profile?.role && !allowedRoles.includes(profile.role)) {
    if (profile.role === 'faculty') return <Navigate to="/dashboard/faculty" replace />;
    if (profile.role === 'company') return <Navigate to="/dashboard/company" replace />;
    return <Navigate to="/dashboard/student" replace />;
  }

  return children;
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-slate-100 font-['Inter',sans-serif] overflow-x-hidden">
      {/* Opening Intro Showcase Animation */}
      <IntroAnimation />

      <ScrollProgressBar />
      <Navbar />
      <main className="w-full flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/feed" element={<InnovationFeedPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          
          {/* Protected Dashboards */}
          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/faculty"
            element={
              <ProtectedRoute allowedRoles={['faculty']}>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/company"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <CompanyDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Shared Platform Footer */}
      <Footer />

      {/* Floating Universal AI Personal Guide */}
      <AIMentorWidget />
    </div>
  );
}

