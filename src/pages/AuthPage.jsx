import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  School,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signUp, signIn, user, profile } = useAuth();

  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'login';
  const initialRole = searchParams.get('role') || 'student';

  const [isSignUp, setIsSignUp] = useState(initialTab === 'signup');
  const [role, setRole] = useState(initialRole);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    college: 'IIT Bombay',
    companyName: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user && profile) {
      if (profile.role === 'faculty') navigate('/dashboard/faculty');
      else if (profile.role === 'company') navigate('/dashboard/company');
      else navigate('/dashboard/student');
    }
  }, [user, profile, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role,
          college: formData.college,
          companyName: formData.companyName
        });
        if (error) throw error;
      } else {
        const { error } = await signIn({
          email: formData.email,
          password: formData.password
        });
        if (error) throw error;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 py-12 bg-[#0B1120] relative">
      <div className="w-full max-w-md bg-[#111827] rounded-2xl p-6 sm:p-8 border border-[#334155] shadow-card relative">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold mb-3 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            {isSignUp ? 'Join InnoBridge Platform' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp ? 'Create your professional ecosystem account' : 'Sign in to access your innovation workspace'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#0B1120] border border-[#334155] mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
            className={`py-2 rounded-lg transition-all ${
              !isSignUp ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
            className={`py-2 rounded-lg transition-all ${
              isSignUp ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span>{errorMsg}</span>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
                    className="block text-emerald-400 font-bold hover:underline mt-1"
                  >
                    Click here to Create a new Account →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}


        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection (Only shown during Signup) */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select Ecosystem Role *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    role === 'student'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-[#0B1120] border-[#334155] text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <span className="text-[11px]">Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('faculty')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    role === 'faculty'
                      ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                      : 'bg-[#0B1120] border-[#334155] text-slate-400 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <span className="text-[11px]">Faculty</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('company')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    role === 'company'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-[#0B1120] border-[#334155] text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-[11px]">Company</span>
                </button>
              </div>
            </div>
          )}

          {/* Full Name */}
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
              />
            </div>
          </div>

          {/* College (for Student / Faculty) */}
          {isSignUp && (role === 'student' || role === 'faculty') && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                University / Institution *
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <select
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0B1120] border-2 border-[#334155] focus:border-emerald-500 text-white text-base font-extrabold outline-none transition-colors cursor-pointer"
                >
                  <option value="IIT Bombay" className="bg-[#111827] text-white py-3 font-extrabold text-base">IIT Bombay</option>
                  <option value="BITS Pilani" className="bg-[#111827] text-white py-3 font-extrabold text-base">BITS Pilani</option>
                  <option value="Delhi Technological University" className="bg-[#111827] text-white py-3 font-extrabold text-base">Delhi Technological University</option>
                  <option value="Anna University" className="bg-[#111827] text-white py-3 font-extrabold text-base">Anna University</option>
                  <option value="IIT Madras" className="bg-[#111827] text-white py-3 font-extrabold text-base">IIT Madras</option>
                  <option value="IIT Kharagpur" className="bg-[#111827] text-white py-3 font-extrabold text-base">IIT Kharagpur</option>
                  <option value="NIT Trichy" className="bg-[#111827] text-white py-3 font-extrabold text-base">NIT Trichy</option>
                </select>
              </div>
            </div>
          )}

          {/* Company Name (for Company) */}
          {isSignUp && role === 'company' && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Company / Venture Firm Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexus Venture Partners"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all mt-6"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSignUp ? (
              <>
                <UserPlus className="w-4 h-4" /> Create Ecosystem Account
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Sign In to Workspace
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

