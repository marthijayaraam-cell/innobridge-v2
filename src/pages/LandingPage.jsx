import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Trophy, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  Globe, 
  Compass, 
  Star,
  Users,
  BookOpen,
  Cpu,
  HeartPulse,
  Leaf,
  Coins,
  Sprout,
  Bot,
  Layers,
  ChevronRight,
  Award
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDocModal from '../components/ProjectDocModal';
import { supabase, isSupabaseConfigured, MOCK_PROJECTS } from '../lib/supabase';

export default function LandingPage() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingProjects();
  }, []);

  async function fetchTrendingProjects() {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('visibility', 'public')
          .limit(3);

        if (!error && data && data.length > 0) {
          setTrendingProjects(data);
          setLoading(false);
          return;
        }
      }
      // Seeded realistic project data fallback
      setTrendingProjects(MOCK_PROJECTS.slice(0, 3));
    } catch (err) {
      console.warn(err);
      setTrendingProjects(MOCK_PROJECTS.slice(0, 3));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#F8FAFC] relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none blur-3xl opacity-80" />


      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        
        {/* Core Brand Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-[#334155] text-xs font-semibold text-emerald-400 mb-8 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>INNOBRIDGE — Showcase. Get Scored. Get Discovered.</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6 text-white">
          Where Student Innovation Meets <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            AI Evaluation & Industry Discovery
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          InnoBridge is the professional ecosystem for university builders. Upload your project along an 11-stage pipeline, earn instant multi-parameter AI feedback, get reviewed by faculty, and get discovered by companies.
        </p>

        {/* Hero Primary + Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/auth?tab=signup&role=student"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <GraduationCap className="w-4 h-4" />
            Join as Student
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/auth?tab=signup&role=company"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-[#334155] text-slate-200 font-bold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            Join as Company
          </Link>
        </div>

        {/* Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-xl bg-[#111827] border border-[#334155] text-left">
          <div className="p-2 border-r border-[#334155]/60 last:border-0">
            <div className="text-2xl font-extrabold text-white">500+</div>
            <div className="text-xs text-slate-400 font-medium">Campus Projects</div>
          </div>
          <div className="p-2 border-r border-[#334155]/60 last:border-0">
            <div className="text-2xl font-extrabold text-emerald-400">8.8 / 10</div>
            <div className="text-xs text-slate-400 font-medium">Avg AI Quality Benchmark</div>
          </div>
          <div className="p-2 border-r border-[#334155]/60 last:border-0">
            <div className="text-2xl font-extrabold text-white">45+</div>
            <div className="text-xs text-slate-400 font-medium">Partner Universities</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-extrabold text-emerald-400">120+</div>
            <div className="text-xs text-slate-400 font-medium">Industry Connections</div>
          </div>
        </div>
      </section>

      {/* Trending Projects Preview Strip (Real Supabase / Seeded Data) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#334155]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Live Platform Activity
            </div>
            <h2 className="text-2xl font-extrabold text-white">Trending Student Innovations</h2>
          </div>

          <Link
            to="/feed"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-[#334155] flex items-center gap-1.5 transition-colors"
          >
            Explore Innovation Feed
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid of real cards */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            Loading live projects from Supabase database...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                userRole="student"
                onViewDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Professional Core Value Proposition Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#334155]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Engineered as a Credible Innovation Ecosystem
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            InnoBridge brings structure, automated scoring, and academic validation to student technical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#111827] rounded-xl p-6 border border-[#334155]">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-brandBlue mb-4">
              <BookOpen className="w-5 h-5 text-electricCyan" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">11-Stage IP Lifecycle</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track project maturity from Idea formulation to Prototyping, Pilot, and Market scale with built-in IP security locks.
            </p>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-[#334155]">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">5-Parameter AI Scoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant LLM evaluation evaluating Innovation, Feasibility, Technical Depth, Market Need, and Impact.
            </p>
          </div>


          <div className="bg-[#111827] rounded-xl p-6 border border-[#334155]">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Faculty Endorsement</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professors provide 1-5 star ratings and academic feedback to validate feasibility and technical execution.
            </p>
          </div>

          <div className="bg-[#111827] rounded-xl p-6 border border-[#334155]">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Industry Matchmaking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Company scouts filter top-scoring student talent by domain and express direct hiring or investment interest.
            </p>
          </div>
        </div>
      </section>

      {/* Project Document Modal */}
      <ProjectDocModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
