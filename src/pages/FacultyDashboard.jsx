import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  GraduationCap, 
  Building2, 
  Sparkles, 
  Search,
  X,
  Filter,
  Check
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectDocModal from '../components/ProjectDocModal';
import { supabase, isSupabaseConfigured, MOCK_PROJECTS } from '../lib/supabase';

export default function FacultyDashboard() {
  const { profile } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'reviewed'
  const [reviewedProjects, setReviewedProjects] = useState([]);

  // Review Modal State
  const [reviewingProject, setReviewingProject] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('Approved');
  const [submitting, setSubmitting] = useState(false);

  // Breakdown modal
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchCollegeProjects();
  }, [profile]);

  async function fetchCollegeProjects() {
    setLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setProjects(data);
          setLoading(false);
          return;
        }
      }

      // Fallback stored or mock projects
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

  const handleOpenReview = (project) => {
    setReviewingProject(project);
    setRating(5);
    setComment('');
    setStatus('Approved');
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewingProject) return;

    setSubmitting(true);
    const reviewData = {
      project_id: reviewingProject.id,
      faculty_id: profile?.id || 'faculty_1',
      rating: Number(rating),
      comment,
      status,
      created_at: new Date().toISOString()
    };

    try {
      if (isSupabaseConfigured) {
        try {
          await supabase.from('reviews').insert([reviewData]);
        } catch (err) {
          console.warn(err);
        }
      }

      // Update project list with new calculated rating
      const updatedProjects = projects.map((p) => {
        if (p.id === reviewingProject.id) {
          const currentCount = p.reviews_count || 1;
          const currentAvg = p.avg_faculty_rating || 0;
          const newAvg = Number((((currentAvg * currentCount) + rating) / (currentCount + 1)).toFixed(1));

          return {
            ...p,
            avg_faculty_rating: newAvg,
            reviews_count: currentCount + 1,
            faculty_status: status
          };
        }
        return p;
      });

      setProjects(updatedProjects);
      localStorage.setItem('innobridge_projects', JSON.stringify(updatedProjects));

      // Add to reviewed list
      setReviewedProjects((prev) => [{ ...reviewingProject, faculty_status: status, avg_faculty_rating: rating }, ...prev]);

      setTimeout(() => {
        setSubmitting(false);
        setReviewingProject(null);
      }, 500);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
    }
  };

  const pendingList = projects.filter((p) => !reviewedProjects.some((r) => r.id === p.id));
  const displayedList = activeTab === 'pending' ? pendingList : reviewedProjects;

  return (
    <div className="min-h-screen w-full bg-[#0B1120] text-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" /> Academic Evaluation Workspace
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Faculty Review Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review submissions, evaluate AI score references, and assign 1-5 star ratings for {profile?.college || 'IIT Bombay'}.
          </p>
        </div>

        {/* Tab Switcher: Pending vs Reviewed */}
        <div className="flex items-center gap-1.5 p-1 rounded-md bg-[#111827] border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'pending'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Needing Review ({pendingList.length})
          </button>
          <button
            onClick={() => setActiveTab('reviewed')}
            className={`px-3.5 py-1.5 rounded-md transition-colors ${
              activeTab === 'reviewed'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Reviewed Items ({reviewedProjects.length})
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Fetching projects for faculty review...
        </div>
      ) : displayedList.length === 0 ? (
        <div className="bg-[#111827] rounded-md p-12 text-center border border-slate-800">
          <ShieldCheck className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">
            {activeTab === 'pending' ? 'No Pending Reviews' : 'No Reviewed Projects Yet'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            {activeTab === 'pending'
              ? 'All submitted student projects from your university have been reviewed!'
              : 'Items you review will appear in this section.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              userRole="faculty"
              onReview={handleOpenReview}
              onViewDetails={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111827] w-full max-w-lg rounded-lg p-6 border border-slate-800 relative">
            <button
              onClick={() => setReviewingProject(null)}
              className="absolute top-6 right-6 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white line-clamp-1">{reviewingProject.title}</h2>
                <p className="text-xs text-slate-400">Student: {reviewingProject.student_name || 'Student Innovator'}</p>
              </div>
            </div>

            {/* AI Score Reference Box */}
            <div className="mb-4 p-3 rounded-md bg-[#0B1120] border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">AI Overall Evaluation Benchmark:</span>
              <span className="badge-ai font-bold px-2.5 py-0.5 rounded-md">
                AI Score: {((reviewingProject.ai_scores?.overall_score || 88) / 10).toFixed(1)} / 10
              </span>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star Rating selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Academic Rating (1 to 5 Stars) *
                </label>
                <div className="flex items-center gap-2 p-3 rounded-md bg-[#0B1120] border border-slate-800 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 transition-colors hover:text-amber-400"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Decision */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Evaluation Outcome
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('Approved')}
                    className={`p-2.5 rounded-md border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                      status === 'Approved'
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Project
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('Changes Requested')}
                    className={`p-2.5 rounded-md border text-xs font-medium flex items-center justify-center gap-2 transition-colors ${
                      status === 'Changes Requested'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" /> Request Changes
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Faculty Review Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide qualitative feedback, technical guidance, or suggestions..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 rounded-md bg-[#0B1120] border border-slate-800 focus:border-slate-600 text-slate-100 text-xs outline-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReviewingProject(null)}
                  className="px-4 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium border border-emerald-500/40 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Submit Review
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Project Document Modal */}
      <ProjectDocModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        userRole="faculty"
      />
    </div>
  );
}
