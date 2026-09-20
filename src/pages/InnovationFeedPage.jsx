import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Filter, 
  Layers, 
  Compass, 
  TrendingUp, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDocModal from '../components/ProjectDocModal';
import { supabase, isSupabaseConfigured, MOCK_PROJECTS, ALL_11_STAGES } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const DOMAIN_OPTIONS = [
  'All Domains',
  'AI & Machine Learning',
  'CleanTech & Energy',
  'HealthTech',
  'Blockchain & FinTech',
  'AgriTech',
  'EdTech & Neuro',
  'Cybersecurity',
  'Robotics & Hardware'
];

const STAGE_OPTIONS = ['All Stages', ...ALL_11_STAGES];

export default function InnovationFeedPage() {
  const { profile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [minAIScore, setMinAIScore] = useState(0);

  // Details Modal
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('visibility', 'public')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      }
      
      // Fallback local projects if database table is empty or offline
      const stored = localStorage.getItem('innobridge_projects');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(MOCK_PROJECTS);
      }
    } catch (err) {
      console.warn("Feed fetch error:", err);
      setProjects(MOCK_PROJECTS);
    } finally {
      setLoading(false);
    }
  }

  // Filter computation
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.student_name && p.student_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDomain = selectedDomain === 'All Domains' || p.domain === selectedDomain;
    const matchesStage = selectedStage === 'All Stages' || p.stage === selectedStage;
    
    const overallScore = p.ai_scores?.overall_score || 88;
    const matchesScore = overallScore >= minAIScore;

    return matchesSearch && matchesDomain && matchesStage && matchesScore;
  });

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-slate-100 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-medium text-[#70B5F9] mb-2">
            <Compass className="w-3.5 h-3.5 text-[#70B5F9]" />
            <span>Public Innovation Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Discover Campus Innovation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
            Browse verified, AI-scored student projects from top research universities.
          </p>
        </div>

        <button
          onClick={fetchProjects}
          className="self-start md:self-auto px-3.5 py-1.5 rounded-md bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-colors btn-interactive"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Feed
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#111827] p-4 sm:p-5 rounded-md border border-slate-800 mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by project name, description, student, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-900 border border-slate-700 focus:border-[#378FE9] text-slate-100 text-xs outline-none transition-colors font-normal"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Domain Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
              Domain / Industry
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:border-[#378FE9] text-xs sm:text-sm font-semibold text-white outline-none cursor-pointer"
            >
              {DOMAIN_OPTIONS.map((d) => (
                <option key={d} value={d} className="bg-[#111827] text-white font-semibold text-xs sm:text-sm py-2">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">
              Development Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:border-[#378FE9] text-xs sm:text-sm font-semibold text-white outline-none cursor-pointer"
            >
              {STAGE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-[#111827] text-white font-semibold text-xs sm:text-sm py-2">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* AI Score Filter */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
              <span>Min AI Score</span>
              <span className="text-[#70B5F9] font-semibold">{minAIScore}+</span>
            </label>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minAIScore}
              onChange={(e) => setMinAIScore(Number(e.target.value))}
              className="w-full accent-[#0A66C2] bg-slate-900 h-2 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Feed Cards Grid */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
          <Sparkles className="w-6 h-6 text-[#70B5F9] animate-spin" />
          <p className="text-xs text-slate-400 font-normal">Fetching live student projects from database...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-[#111827] rounded-md p-12 text-center border border-slate-800">
          <Layers className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Matching Innovations Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4 font-normal">
            Try adjusting your search query, domain filters, or lowering the minimum AI score filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('All Domains');
              setSelectedStage('All Stages');
              setMinAIScore(0);
            }}
            className="px-3.5 py-1.5 rounded-md bg-[#0A66C2] hover:bg-[#084E96] text-white text-xs font-medium transition-colors btn-interactive"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Top Benchmark Highlight Card (Taste Skill Layout Rhythm Variation) */}
          {filteredProjects.length > 0 && (
            <div className="bg-[#111827] border border-blue-500/30 rounded-md p-5 sm:p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 card-hover-effect">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-500/10 text-[#70B5F9] border border-blue-500/30 text-[10px] font-semibold tracking-wide uppercase">
                    TOP AI BENCHMARK SPOTLIGHT
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{filteredProjects[0].domain}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {filteredProjects[0].title}
                </h2>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {filteredProjects[0].description}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                  <span>By <strong className="text-white">{filteredProjects[0].student_name}</strong></span>
                  <span>•</span>
                  <span>{filteredProjects[0].college || 'Top Tier Institute'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-between">
                <div className="text-left md:text-right">
                  <div className="text-xs text-slate-400 font-medium">Overall Benchmark</div>
                  <div className="text-2xl font-extrabold text-[#70B5F9] font-mono">
                    {filteredProjects[0].ai_scores?.overall_score || 94}/100
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(filteredProjects[0])}
                  className="px-4 py-2 rounded-md bg-[#0A66C2] hover:bg-[#084E96] text-white text-xs font-semibold btn-interactive"
                >
                  View Full IP Doc
                </button>
              </div>
            </div>
          )}

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                userRole={profile?.role || 'student'}
                onViewDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </>
      )}

      {/* Project Document & Stages Modal */}
      <ProjectDocModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        userRole={profile?.role || 'student'}
      />
    </div>
  );
}

