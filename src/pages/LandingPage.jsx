import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.svg';
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-[#70B5F9] mb-6">
          <img src={logoImg} alt="InnoBridge Logo" className="w-3.5 h-3.5 object-contain" />
          <span>INNOBRIDGE — Showcase. Get Scored. Get Discovered.</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-4 text-white">
          Where Student Innovation Meets <br className="hidden sm:inline" />
          <span className="text-[#70B5F9]">
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
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-[#0A66C2] hover:bg-[#084E96] text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors btn-interactive"
          >
            <GraduationCap className="w-4 h-4" />
            Join as Student
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/auth?tab=signup&role=company"
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs flex items-center justify-center gap-2 transition-colors btn-interactive"
          >
            <Building2 className="w-4 h-4 text-[#70B5F9]" />
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
            <div className="text-2xl font-bold text-[#70B5F9]">8.8 / 10</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Avg AI Benchmark</div>
          </div>
          <div className="p-2 border-r border-slate-800 last:border-0">
            <div className="text-2xl font-bold text-white">45+</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Partner Universities</div>
          </div>
          <div className="p-2">
            <div className="text-2xl font-bold text-[#70B5F9]">120+</div>
            <div className="text-xs text-slate-400 font-normal mt-0.5">Industry Connections</div>
          </div>
        </div>
      </section>

      {/* Trending Projects Preview Strip (Real Supabase / Seeded Data) */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] w-full mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#70B5F9] uppercase tracking-wider mb-1">
              <img src={logoImg} alt="InnoBridge" className="w-3.5 h-3.5 object-contain" /> Live Platform Activity
            </div>
            <h2 className="text-xl font-bold text-white">Trending Student Innovations</h2>
          </div>

          <Link
            to="/feed"
            className="px-3.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors btn-interactive"
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

      {/* Professional Core Value Proposition Grid - Taste Skill Asymmetric Layout */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] w-full mx-auto border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-[#70B5F9] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#70B5F9]" /> Platform Architecture
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Engineered as a Credible Innovation Ecosystem
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm font-normal max-w-md">
            InnoBridge brings structure, automated multi-parameter scoring, and academic validation to student technical projects.
          </p>
        </div>

        {/* Asymmetrical High-Taste Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Spotlight Feature (7 cols) */}
          <div className="lg:col-span-7 bg-[#111827] rounded-md p-6 border border-slate-800 flex flex-col justify-between relative overflow-hidden card-hover-effect">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-[#70B5F9] border border-blue-500/30 text-[11px] font-semibold">
                  CORE INFRASTRUCTURE
                </span>
                <span className="text-xs text-slate-400 font-mono">11-Stage Pipeline</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2">
                11-Stage IP Lifecycle & 5-Parameter AI Scoring
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal mb-6">
                From initial Idea formulation to Prototyping, Pilot, and Market Scale — every upload is evaluated across 5 core parameters: Innovation, Feasibility, Technical Depth, Market Need, and Impact.
              </p>

              {/* Visual 5-Parameter AI Benchmark Bar Preview */}
              <div className="space-y-2 bg-[#0B1120] p-4 rounded-md border border-slate-800/80 mb-4">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium">Innovation & Novelty</span>
                  <span className="text-[#70B5F9] font-semibold font-mono">92/100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#378FE9] h-full rounded-full w-[92%]"></div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-300 font-medium">Technical Depth & Architecture</span>
                  <span className="text-[#70B5F9] font-semibold font-mono">88/100</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#378FE9] h-full rounded-full w-[88%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#70B5F9] font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-[#70B5F9]" />
              <span>Built-in IP security locks & automatic benchmark generation</span>
            </div>
          </div>

          {/* Right Column Stacked Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Faculty Verification */}
            <div className="bg-[#111827] rounded-md p-6 border border-slate-800 card-hover-effect flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Faculty Endorsement</h4>
                  <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">Academic Validation</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                University faculty review submissions, provide 1-5 star ratings, and write academic feedback to confirm technical feasibility and research integrity.
              </p>
            </div>

            {/* Card 2: Industry Discovery */}
            <div className="bg-[#111827] rounded-md p-6 border border-slate-800 card-hover-effect flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#70B5F9] shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Industry Matchmaking</h4>
                  <span className="text-[10px] text-[#70B5F9] font-semibold uppercase tracking-wider">Direct Scouting</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Corporate scouts search top-scoring student talent by domain, stage, and AI score to initiate direct hiring pipelines or grant funding.
              </p>
            </div>
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
