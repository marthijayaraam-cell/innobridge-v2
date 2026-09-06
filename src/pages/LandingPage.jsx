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
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] w-full mx-auto text-center">
        
        {/* Core Brand Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-emerald-400 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>INNOBRIDGE — Showcase. Get Scored. Get Discovered.</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-4 text-white">
          Where Student Innovation Meets <br className="hidden sm:inline" />
          <span className="text-emerald-400">
            AI Evaluation & Industry Discovery
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          InnoBridge is the professional ecosystem for university builders. Upload your project along an 11-stage pipeline, earn instant multi-parameter AI feedback, get reviewed by faculty, and get discovered by companies.
        </p>

        {/* Hero Primary + Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            to="/auth?tab=signup&role=student"
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <GraduationCap className="w-4 h-4" />
            Join as Student
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/auth?tab=signup&role=company"
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            Join as Company
          </Link>
        </div>

        {/* Metric Bar - GitHub Style Flat Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 rounded-md bg-[#111827] border border-slate-800 text-left">
          <div className="p-2 border-r border-slate-800 last:border-0">
            <div className="text-2xl font-bold text-white">500+</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Campus Projects</div>
          </div>
          <div className="p-2 border-r border-slate-800 last:border-0">
            <div className="text-2xl font-bold text-emerald-400">8.8 / 10</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Avg AI Benchmark</div>
          </div>
          <div className="p-2 border-r border-slate-800 last:border-0">
            <div className="text-2xl font-bold text-white">45+</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Partner Universities</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-emerald-400">120+</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Industry Connections</div>
          </div>
        </div>
      </section>

      {/* Trending Projects Preview Strip (Real Supabase / Seeded Data) */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] w-full mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Live Platform Activity
            </div>
            <h2 className="text-xl font-bold text-white">Trending Student Innovations</h2>
          </div>

          <Link
            to="/feed"
            className="px-3.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
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
      <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] w-full mx-auto border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Engineered as a Credible Innovation Ecosystem
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-normal">
            InnoBridge brings structure, automated scoring, and academic validation to student technical projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#111827] rounded-md p-5 border border-slate-800">
            <div className="w-9 h-9 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-3">
              <BookOpen className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">11-Stage IP Lifecycle</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Track project maturity from Idea formulation to Prototyping, Pilot, and Market scale with built-in IP security locks.
            </p>
          </div>

          <div className="bg-[#111827] rounded-md p-5 border border-slate-800">
            <div className="w-9 h-9 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">5-Parameter AI Scoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Instant LLM evaluation evaluating Innovation, Feasibility, Technical Depth, Market Need, and Impact.
            </p>
          </div>


          <div className="bg-[#111827] rounded-md p-5 border border-slate-800">
            <div className="w-9 h-9 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-3">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Faculty Endorsement</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Professors provide 1-5 star ratings and academic feedback to validate feasibility and technical execution.
            </p>
          </div>

          <div className="bg-[#111827] rounded-md p-5 border border-slate-800">
            <div className="w-9 h-9 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-3">
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">Industry Matchmaking</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
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
