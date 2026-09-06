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

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400 text-sm font-semibold">
        Loading InnoBridge Workspace...
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
      <ScrollProgressBar />
      <Navbar />
      <main className="w-full flex-1">
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

      {/* Floating Universal AI Personal Guide */}
      <AIMentorWidget />
    </div>
  );
}

