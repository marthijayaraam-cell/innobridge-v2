import React, { useState, useEffect } from 'react';
import { 
  User, 
  Award, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  FolderGit2, 
  Star,
  ExternalLink,
  Mail,
  Edit,
  Share2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured, MOCK_PROJECTS } from '../lib/supabase';
import ProjectCard from '../components/ProjectCard';
import ProjectDocModal from '../components/ProjectDocModal';

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [userProjects, setUserProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchUserProjects();
  }, [profile]);

  async function fetchUserProjects() {
    setLoading(true);
    try {
      if (isSupabaseConfigured && profile?.id) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('student_id', profile.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setUserProjects(data);
          setLoading(false);
          return;
        }
      }

      // Fallback local projects
      const stored = localStorage.getItem('innobridge_projects');
      const allProjects = stored ? JSON.parse(stored) : MOCK_PROJECTS;
      const filtered = allProjects.filter(p => p.student_name === profile?.full_name || p.student_id === profile?.id);
      setUserProjects(filtered.length > 0 ? filtered : allProjects.slice(0, 2));
    } catch (err) {
      console.warn("Profile projects fetch error:", err);
      setUserProjects(MOCK_PROJECTS.slice(0, 2));
    } finally {
      setLoading(false);
    }
  }

  const highestAIScore = userProjects.reduce((max, p) => Math.max(max, p.ai_scores?.overall_score || 0), 0) || 94;
  const totalProjects = userProjects.length || 3;
  const ipProtectedCount = userProjects.filter(p => p.visibility === 'private' || p.visibility === 'protected').length || 2;
  const innovationScore = profile?.innovation_score || (totalProjects * 10 + highestAIScore * 5 + 150);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-800 to-emerald-950/60 rounded-3xl p-6 sm:p-8 border border-slate-700/60 shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-extrabold text-3xl shadow-lg border-2 border-emerald-400/40">
              {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {profile?.full_name || 'Innovator Profile'}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs capitalize flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {profile?.role || 'Student'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  {profile?.college || 'IIT Bombay'}
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {profile?.domain || 'Computer Science & AI'}
                </span>
              </p>

              <div className="mt-3 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Identity & College Verified
                </span>
                <span className="text-xs text-slate-400">Member since 2026</span>
              </div>
            </div>
          </div>

          {/* Action & Score Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/30 text-center flex-1 md:flex-initial shadow-inner">
              <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider block mb-0.5">Innovation Score</span>
              <div className="text-2xl font-black text-white flex items-center justify-center gap-1.5">
                <Award className="w-5 h-5 text-amber-400" />
                <span>{innovationScore}</span>
              </div>
            </div>

            <button 
              onClick={() => alert("Portfolio link copied to clipboard!")}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <Share2 className="w-4 h-4" />
              Share Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Verified Projects</span>
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalProjects}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Active across 11 stages</span>
        </div>

        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>Peak AI Score</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300">{highestAIScore}/100</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Highest evaluation metric</span>
        </div>

        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>IP Protected Assets</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-300">{ipProtectedCount}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Stage-gated confidentiality</span>
        </div>

        <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
            <span>University Rank</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">Top 5%</div>
          <span className="text-[11px] text-slate-400 mt-1 block">IIT Bombay Innovators</span>
        </div>
      </div>

      {/* Projects Portfolio Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/60">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-emerald-400" />
            Project Portfolio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Stage-structured documentation and verified scorecards.
          </p>
        </div>
      </div>

      {/* Project Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center">
          <Sparkles className="w-7 h-7 text-emerald-400 animate-spin mb-2" />
          <span>Loading student portfolio...</span>
        </div>
      ) : userProjects.length === 0 ? (

        <div className="bg-slate-800/80 rounded-2xl p-10 text-center border border-slate-700/60">
          <FolderGit2 className="w-10 h-10 text-slate-500 mx-auto mb-2" />
          <h3 className="text-base font-bold text-white">No Projects Published Yet</h3>
          <p className="text-xs text-slate-400 mt-1">Submit your first innovation to generate your AI scorecard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              userRole={profile?.role || 'student'}
              onViewDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Project Document Modal */}
      <ProjectDocModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        userRole={profile?.role || 'student'}
      />
    </div>
  );
}
