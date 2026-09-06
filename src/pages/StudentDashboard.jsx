import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, 
  Award, 
  Layers, 
  BarChart3, 
  Sparkles, 
  GraduationCap, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Code,
  FolderPlus,
  Star
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectUploadModal from '../components/ProjectUploadModal';
import ProjectDocModal from '../components/ProjectDocModal';
import AIMentorWidget from '../components/AIMentorWidget';
import { supabase, isSupabaseConfigured, MOCK_PROJECTS } from '../lib/supabase';
import { calculateStudentInnovationScore } from '../lib/scoreCalculator';

export default function StudentDashboard() {
  const { user, profile, updateProfileScore } = useAuth();
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchMyProjects();
  }, [user]);

  async function fetchMyProjects() {
    setLoading(true);
    try {
      if (isSupabaseConfigured && user) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('student_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setMyProjects(data);
          recalcAndUpdateScore(data);
          setLoading(false);
          return;
        }
      }

      // Fallback local projects
      const stored = localStorage.getItem(`innobridge_user_projects_${user?.id || 'demo'}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setMyProjects(parsed);
        recalcAndUpdateScore(parsed);
      } else {
        // Default seed projects for student demo
        const demoProjects = MOCK_PROJECTS.slice(0, 2).map((p) => ({
          ...p,
          student_id: user?.id || 'demo_student'
        }));
        setMyProjects(demoProjects);
        recalcAndUpdateScore(demoProjects);
      }
    } catch (err) {
      console.warn("My projects fetch error:", err);
      setMyProjects(MOCK_PROJECTS.slice(0, 2));
    } finally {
      setLoading(false);
    }
  }

  function recalcAndUpdateScore(projectsList) {
    const newScore = calculateStudentInnovationScore(projectsList);
    updateProfileScore(newScore);
  }

  const handleProjectCreated = async (newProjectData) => {
    const completeProject = {
      id: 'p_' + Date.now(),
      student_id: user?.id || 'demo_student',
      student_name: profile?.full_name || 'Student Innovator',
      college: profile?.college || 'IIT Bombay',
      ...newProjectData
    };

    if (isSupabaseConfigured && user) {
      try {
        await supabase.from('projects').insert([completeProject]);
      } catch (err) {
        console.warn(err);
      }
    }

    const updatedList = [completeProject, ...myProjects];
    setMyProjects(updatedList);

    // Save to local storage for persistent demo state
    localStorage.setItem(
      `innobridge_user_projects_${user?.id || 'demo'}`,
      JSON.stringify(updatedList)
    );

    // Recalculate score
    recalcAndUpdateScore(updatedList);
  };

  const currentScore = profile?.innovation_score || calculateStudentInnovationScore(myProjects);

  const avgFacultyRating = myProjects.length > 0
    ? (myProjects.reduce((acc, p) => acc + (p.avg_faculty_rating || 0), 0) / myProjects.length).toFixed(1)
    : '0.0';

  const avgAIScore = myProjects.length > 0
    ? (myProjects.reduce((acc, p) => acc + (p.ai_scores?.overall_score || 88), 0) / (myProjects.length * 10)).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto relative">
      
      {/* Command Center Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-[#334155] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4 text-emerald-400" /> Student Innovation Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Welcome back, {profile?.full_name || 'Innovator'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {profile?.college || 'IIT Bombay'} • Verified Student Builder
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Upload New Project
        </button>
      </div>

      {/* Top Command Center Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        
        {/* Large Prominent Total Innovation Score Card */}
        <div className="bg-[#111827] rounded-xl p-5 border border-emerald-500/40 relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-[#111827] to-transparent">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Total Innovation Score
            </span>
            <div className="w-8 h-8 rounded-lg badge-ai flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-white mb-1">
            {currentScore}
          </div>
          <p className="text-[10px] text-slate-400 font-mono">
            Formula: (Projects × 10) + (AI Score × 5) + (Faculty Rating × 15) + Stage Bonus
          </p>
        </div>


        {/* Total Submissions Metric */}
        <div className="bg-[#111827] rounded-xl p-5 border border-[#334155]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Total Submissions
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-brandBlue">
              <Layers className="w-4 h-4 text-electricCyan" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {myProjects.length}
          </div>
          <p className="text-[10px] text-slate-400">Active portfolio entries</p>
        </div>

        {/* Avg Faculty Rating Metric */}
        <div className="bg-[#111827] rounded-xl p-5 border border-[#334155]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Avg Faculty Rating
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">
            {avgFacultyRating} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <p className="text-[10px] text-slate-400">Academic peer audit average</p>
        </div>

        {/* Avg AI Benchmark Metric */}
        <div className="bg-[#111827] rounded-xl p-5 border border-[#334155]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Avg AI Evaluation
            </span>
            <div className="w-8 h-8 rounded-lg badge-ai flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-aiIndigoDark" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#818CF8] mb-1">
            {avgAIScore} <span className="text-xs text-slate-400 font-normal">/ 10</span>
          </div>
          <p className="text-[10px] text-slate-400">5-metric LLM benchmark</p>
        </div>
      </div>

      {/* Projects Portfolio Section */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-white">My Projects Portfolio</h2>
        <span className="text-xs text-slate-400">Showing {myProjects.length} entry(s)</span>
      </div>

      {/* Project Cards Grid with 5-parameter breakdown bars inside details drawer */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading your innovation workspace...
        </div>
      ) : myProjects.length === 0 ? (
        <div className="bg-[#111827] rounded-2xl p-12 text-center border border-[#334155]">
          <FolderPlus className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Projects Submitted Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
            Upload your project to receive multi-parameter AI scoring, faculty reviews, and rank on university leaderboards.
          </p>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-brandBlue text-white text-xs font-bold shadow-sm"
          >
            Upload First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              userRole="student"
              onViewDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <ProjectUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onProjectCreated={handleProjectCreated}
      />

      {/* Project Document & 11-Stage IP Modal */}
      <ProjectDocModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        userRole="student"
      />

      {/* Floating AI Mentor Chatbot Widget */}
      <AIMentorWidget currentProjectContext={myProjects[0] || null} />
    </div>
  );
}
