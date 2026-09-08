import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, 
  Compass, 
  Trophy, 
  LayoutDashboard, 
  LogOut, 
  LogIn, 
  UserPlus, 
  GraduationCap, 
  Building2, 
  Award,
  BookOpen,
  User,
  Home,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = () => {
    if (!profile) return '/auth';
    if (profile.role === 'faculty') return '/dashboard/faculty';
    if (profile.role === 'company') return '/dashboard/company';
    return '/dashboard/student';
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0B1120]/95 backdrop-blur-md">
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-14">
          
          {/* Left Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center text-white font-extrabold text-xs shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5">
                InnoBridge
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                  v2.0
                </span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive('/') ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </Link>

            <Link
              to="/feed"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive('/feed') ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              Innovation Feed
            </Link>

            <Link
              to="/leaderboard"
              className={`px-3 py-1.5 rounded-md transition-colors ${
                isActive('/leaderboard') ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              Leaderboard
            </Link>

            {user && (
              <Link
                to={getDashboardPath()}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  location.pathname.startsWith('/dashboard')
                    ? 'text-white bg-slate-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Workspace
              </Link>
            )}
          </nav>

          {/* Right Action Controls & User State */}
          <div className="flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center justify-center border border-slate-700/60"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-200 rotate-0 hover:-rotate-12" />
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                {/* User Innovation Score Pill */}
                {profile?.innovation_score !== undefined && (
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-semibold text-xs">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Score: {profile.innovation_score}</span>
                  </div>
                )}

                {/* Profile Link */}
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white font-semibold text-xs">
                    {((profile?.full_name && !/^\d/.test(profile.full_name)) ? profile.full_name : 'Marthi Jayaraam')[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-slate-200 max-w-[120px] truncate hidden lg:inline">
                    {(profile?.full_name && !/^\d/.test(profile.full_name) && !profile.full_name.includes('24eu')) ? profile.full_name : 'Marthi Jayaraam'}
                  </span>
                </button>

                <button
                  onClick={signOut}
                  title="Sign Out"
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth?tab=login"
                  className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?tab=signup"
                  className="px-3.5 py-1.5 rounded-md text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  Join as Student
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 border-b border-slate-800 bg-[#111827] space-y-1 text-sm font-medium">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-emerald-400">Home</Link>
            <Link to="/feed" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-emerald-400">Innovation Feed</Link>
            <Link to="/leaderboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-emerald-400">Leaderboard</Link>
            {user && <Link to={getDashboardPath()} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-emerald-400">Workspace</Link>}
            {user && <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-emerald-400">My Portfolio</Link>}
          </div>
        )}
      </header>

      {/* Mobile Bottom Tab Bar (For Hackathons & Phone Demos) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1120]/95 backdrop-blur-lg border-t border-slate-800 py-2 px-3 flex items-center justify-around text-[10px] font-medium text-slate-400">
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-emerald-400 font-bold' : ''}`}>
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>

        <Link to="/feed" className={`flex flex-col items-center gap-1 ${isActive('/feed') ? 'text-emerald-400 font-bold' : ''}`}>
          <Compass className="w-4 h-4" />
          <span>Feed</span>
        </Link>

        {user ? (
          <Link to={getDashboardPath()} className={`flex flex-col items-center gap-1 ${location.pathname.startsWith('/dashboard') ? 'text-emerald-400 font-bold' : ''}`}>
            <LayoutDashboard className="w-4 h-4" />
            <span>Workspace</span>
          </Link>
        ) : (
          <Link to="/auth?tab=signup" className="flex flex-col items-center gap-1 text-emerald-400 font-bold">
            <UserPlus className="w-4 h-4" />
            <span>Join</span>
          </Link>
        )}

        <Link to="/leaderboard" className={`flex flex-col items-center gap-1 ${isActive('/leaderboard') ? 'text-amber-400 font-bold' : ''}`}>
          <Trophy className="w-4 h-4" />
          <span>Ranks</span>
        </Link>

        {user && (
          <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-emerald-400 font-bold' : ''}`}>
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
        )}
      </div>
    </>
  );
}

