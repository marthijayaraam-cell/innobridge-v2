import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Search, 
  Send, 
  BookmarkCheck, 
  Sparkles, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Users
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDocModal from '../components/ProjectDocModal';
import { supabase, isSupabaseConfigured, MOCK_PROJECTS, ALL_11_STAGES } from '../lib/supabase';

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

export default function CompanyDashboard() {
  const { profile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('browse'); // 'browse' | 'shortlist'
  const [interestedProjects, setInterestedProjects] = useState([]);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [minAIScore, setMinAIScore] = useState(80);

  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
    loadInterested();
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

      const stored = localStorage.getItem('innobridge_projects');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(MOCK_PROJECTS);
      }
    } catch (err) {
      console.warn(err);
      setProjects(MOCK_PROJECTS);
    } finally {
      setLoading(false);
    }
  }

  function loadInterested() {
    const stored = localStorage.getItem('innobridge_company_interests');
    if (stored) {
      setInterestedProjects(JSON.parse(stored));
    }
  }

  const handleExpressInterest = async (project) => {
    const interestRecord = {
      id: 'int_' + Date.now(),
      project_id: project.id,
      company_id: profile?.id || 'company_1',
      company_name: profile?.company_name || 'Venture Scout',
      project_title: project.title,
      student_name: project.student_name,
      college: project.college,
      domain: project.domain,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from('interests').insert([interestRecord]);
      } catch (err) {
        console.warn(err);
      }
    }

    const updated = [interestRecord, ...interestedProjects.filter((i) => i.project_id !== project.id)];
    setInterestedProjects(updated);
    localStorage.setItem('innobridge_company_interests', JSON.stringify(updated));
  };

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
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" /> Industry & Talent Scouting Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            {profile?.company_name || 'Company'} Innovation Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse verified high-scoring student innovations, express interest, and build your candidate talent pipeline.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-md bg-[#111827] border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'browse'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" /> Browse Talent & Projects
          </button>
          <button
            onClick={() => setActiveTab('shortlist')}
            className={`px-3.5 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'shortlist'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" /> Expressed Interests ({interestedProjects.length})
          </button>
        </div>
      </div>

      {activeTab === 'browse' ? (
        <>
          {/* Filters Bar */}
          <div className="bg-[#111827] p-4 rounded-md border border-slate-800 mb-8 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search high-potential projects by keyword or student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-md bg-[#0B1120] border border-slate-800 focus:border-slate-600 text-slate-100 text-xs outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Domain Filter
                </label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B1120] border border-slate-800 text-xs font-medium text-white outline-none focus:border-slate-600 cursor-pointer"
                >
                  {DOMAIN_OPTIONS.map((d) => (
                    <option key={d} value={d} className="bg-[#111827] text-white font-normal text-xs py-2">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Stage Filter
                </label>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B1120] border border-slate-800 text-xs font-medium text-white outline-none focus:border-slate-600 cursor-pointer"
                >
                  {['All Stages', ...ALL_11_STAGES].map((s) => (
                    <option key={s} value={s} className="bg-[#111827] text-white font-normal text-xs py-2">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex justify-between">
                  <span>Minimum AI Score Cutoff</span>
                  <span className="text-emerald-400 font-bold">{(minAIScore / 10).toFixed(1)}+</span>
                </label>
                <input
                  type="range"
                  min="60"
                  max="95"
                  step="5"
                  value={minAIScore}
                  onChange={(e) => setMinAIScore(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-[#0B1120] h-2 rounded-md cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="py-20 text-center text-slate-400 text-xs">
              Loading verified student innovations...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-[#111827] rounded-md p-12 text-center border border-slate-800">
              <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No Projects Match Your Filter</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Try lowering the minimum AI score filter or resetting domain choices.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  userRole="company"
                  onExpressInterest={handleExpressInterest}
                  onViewDetails={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        /* Shortlisted / Expressed Interest Tab */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Expressed Interest Shortlist</h2>
            <span className="text-xs text-slate-400">{interestedProjects.length} candidate(s) saved</span>
          </div>

          {interestedProjects.length === 0 ? (
            <div className="bg-[#111827] rounded-md p-12 text-center border border-slate-800">
              <BookmarkCheck className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No Expressed Interests Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                Click "Express Interest" on project cards to build your pipeline of top campus talent.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs border border-emerald-500/40"
              >
                Browse Projects
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {interestedProjects.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#111827] rounded-md p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.project_title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Student: <span className="text-slate-200 font-semibold">{item.student_name || 'Innovator'}</span> • {item.college}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Interest Logged
                    </span>
                    <button
                      onClick={() => {
                        const proj = projects.find((p) => p.id === item.project_id);
                        if (proj) setSelectedProject(proj);
                      }}
                      className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 hover:text-white"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Project Document Modal */}
      <ProjectDocModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        userRole="company"
      />
    </div>
  );
}
