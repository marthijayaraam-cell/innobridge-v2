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
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-700/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-2">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Public Innovation Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Discover Campus Innovation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified, AI-scored student projects from top research universities.
          </p>
        </div>

        <button
          onClick={fetchProjects}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-800 border border-slate-700/60 hover:border-slate-500 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Feed
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/60 mb-8 space-y-4 shadow-md">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by project name, description, student, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/70 focus:border-emerald-500 text-slate-100 text-sm outline-none transition-colors"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Domain Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Domain / Industry
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#111827] border border-[#334155] focus:border-emerald-500 text-xs sm:text-sm md:text-base font-bold text-white outline-none transition-colors cursor-pointer"
            >
              {DOMAIN_OPTIONS.map((d) => (
                <option key={d} value={d} className="bg-[#111827] text-white font-bold text-xs sm:text-sm md:text-base py-2">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Development Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#111827] border border-[#334155] focus:border-emerald-500 text-xs sm:text-sm md:text-base font-bold text-white outline-none transition-colors cursor-pointer"
            >
              {STAGE_OPTIONS.map((s) => (
                <option key={s} value={s} className="bg-[#111827] text-white font-bold text-xs sm:text-sm md:text-base py-2">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* AI Score Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
              <span>Min AI Score</span>
              <span className="text-emerald-400 font-bold">{minAIScore}+</span>
            </label>
            <input
              type="range"
              min="0"
              max="95"
              step="5"
              value={minAIScore}
              onChange={(e) => setMinAIScore(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Feed Cards Grid */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center space-y-3">
          <Sparkles className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-sm text-slate-400">Fetching live student projects from Supabase database...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-slate-800/80 rounded-2xl p-12 text-center border border-slate-700/60 shadow-lg">
          <Layers className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Matching Innovations Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Try adjusting your search query, domain filters, or lowering the minimum AI score filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDomain('All Domains');
              setSelectedStage('All Stages');
              setMinAIScore(0);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (

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

