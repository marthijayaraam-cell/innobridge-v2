import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  GraduationCap, 
  Building2, 
  FileText, 
  Cpu, 
  Lightbulb, 
  Layers, 
  Rocket,
  Award,
  Star,
  Send,
  Target,
  Search,
  ClipboardList,
  Compass,
  CheckSquare,
  Globe,
  TrendingUp
} from 'lucide-react';

export const ELEVEN_STAGES = [
  { rank: 1, key: 'IDEA', name: '💡 Idea Formulation', desc: 'Concept & Brainstorm' },
  { rank: 2, key: 'PROBLEM', name: '🎯 Problem Definition', desc: 'Need & Scope' },
  { rank: 3, key: 'RESEARCH', name: '🔎 Research & Analysis', desc: 'Market & Literature' },
  { rank: 4, key: 'REQUIREMENTS', name: '📋 Requirements & Planning', desc: 'PRD & Milestones' },
  { rank: 5, key: 'ARCHITECTURE', name: '🏗️ Architecture & Design', desc: 'System & UI/UX' },
  { rank: 6, key: 'PROTOTYPE', name: '🧪 PoC / Prototype', desc: 'Proof of Concept' },
  { rank: 7, key: 'MVP', name: '⚙️ MVP Development', desc: 'Core Engineering' },
  { rank: 8, key: 'TESTING', name: '🔬 Testing & Validation', desc: 'QA & User Tests' },
  { rank: 9, key: 'PILOT', name: '🌍 Pilot Deployment', desc: 'Field Sandbox' },
  { rank: 10, key: 'FINAL_PRODUCT', name: '🚀 Final Product', desc: 'Production Ready' },
  { rank: 11, key: 'SCALE', name: '📈 Launch → Scale → Maintain', desc: 'Market Scale & IP' }
];

export default function ProjectDocModal({ project, isOpen, onClose, userRole = 'student' }) {
  const [activeTab, setActiveTab] = useState('doc'); // 'doc' | 'ai_scores'
  const [accessRequested, setAccessRequested] = useState(false);

  if (!isOpen || !project) return null;

  const {
    title,
    description,
    domain,
    stage = 'Idea Formulation',
    demo_url,
    github_url,
    student_name = 'Student Innovator',
    college = 'IIT Bombay',
    ai_scores = {},
    avg_faculty_rating = 0,
    reviews_count = 0
  } = project;

  // Calculate current stage rank (1 to 11)
  const getStageRank = (stg) => {
    switch (stg) {
      case 'Idea Formulation':
      case 'Ideation': return 1;
      case 'Problem Definition': return 2;
      case 'Research & Analysis': return 3;
      case 'Requirements & Planning': return 4;
      case 'Architecture & Design': return 5;
      case 'PoC / Prototype':
      case 'Prototype': return 6;
      case 'MVP Development': return 7;
      case 'Testing & Validation': return 8;
      case 'Pilot Deployment':
      case 'Pilot': return 9;
      case 'Final Product': return 10;
      case 'Launch -> Scale -> Maintain':
      case 'Launched': return 11;
      default: return 3;
    }
  };

  const currentRank = getStageRank(stage);

  const handleRequestAccess = () => {
    setAccessRequested(true);
    setTimeout(() => setAccessRequested(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-5xl rounded-3xl p-6 md:p-8 border border-borderSubtle shadow-glowLg relative max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-subtext hover:text-white hover:bg-white/10 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-borderSubtle/70 pb-6 pr-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-md shrink-0">
              <div className="w-full h-full bg-[#14141C] rounded-[14px] flex items-center justify-center">
                <FileText className="w-7 h-7 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300">
                  {domain}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <span>Stage {currentRank}/11:</span> {stage}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">{title}</h2>
              <p className="text-xs text-subtext mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1 text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" /> {student_name}
                </span>
                •
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {college}
                </span>
              </p>
            </div>
          </div>

          {/* AI Composite Score Box */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-[#0A0A0F] p-3 rounded-2xl border border-emerald-500/30">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-subtext">AI Score</div>
              <div className="text-2xl font-extrabold text-emerald-400">{ai_scores.overall_score || 88}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* 11-Stage Interactive Timeline Bar */}
        <div className="bg-[#0A0A0F] p-4 rounded-2xl border border-borderSubtle mb-6">
          <div className="text-xs font-bold text-subtext uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Structured 11-Stage Development Pipeline</span>
            <span className="text-emerald-400 font-semibold">
              Currently at Stage {currentRank} of 11
            </span>
          </div>

          {/* Horizontally scrollable 11 stages bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {ELEVEN_STAGES.map((s) => {
              const isCompleted = s.rank < currentRank;
              const isCurrent = s.rank === currentRank;
              const isLocked = s.rank > currentRank;

              return (
                <div
                  key={s.key}
                  className={`min-w-[140px] p-2.5 rounded-xl border text-left shrink-0 transition-all ${
                    isCurrent
                      ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm scale-105'
                      : isCompleted
                      ? 'bg-white/5 border-emerald-500/30 text-slate-200'
                      : 'bg-[#14141C]/40 border-borderSubtle/50 text-gray-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-extrabold text-subtext uppercase">
                      #{s.rank}
                    </span>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Lock className="w-3 h-3 text-gray-600" />
                    )}
                  </div>
                  <div className="text-[11px] font-bold truncate">{s.name}</div>
                  <div className="text-[9px] text-subtext truncate mt-0.5">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-borderSubtle mb-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('doc')}
            className={`pb-3 px-4 transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'doc'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-subtext hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" /> 11-Stage Structured IP Document
          </button>
          <button
            onClick={() => setActiveTab('ai_scores')}
            className={`pb-3 px-4 transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'ai_scores'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-subtext hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" /> AI Evaluation Breakdown
          </button>
        </div>


        {/* Tab 1: 11-Stage Structured Document */}
        {activeTab === 'doc' && (
          <div className="space-y-6 flex-1">
            {/* Outsider Security Warning Banner for Early Stages */}
            {currentRank <= 4 && (
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">
                    🔒 Intellectual Property (IP) Protection Active for Outsiders
                  </span>
                  This project is currently in early stage (Stage {currentRank}/11: {stage}). To protect the innovator's IP, high-level concept details are public, while internal technical blueprints and codebase specs are locked for public viewers.
                </div>
              </div>
            )}

            {/* STAGES 1 & 2: IDEA & PROBLEM (Always Publicly Unlocked) */}
            <div className="glass-card rounded-2xl p-6 border border-borderSubtle space-y-4">
              <div className="flex items-center justify-between border-b border-borderSubtle pb-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Stages 1 & 2: Idea Formulation & Problem Definition
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Public Overview Unlocked
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">🎯 Problem Statement</span>
                  <p className="text-slate-200 leading-relaxed">
                    Existing systems in {domain} suffer from inefficiency and lack real-time AI automation.
                  </p>
                </div>
                <div>
                  <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">💡 Core Solution Thesis</span>
                  <p className="text-slate-200 leading-relaxed">{description}</p>
                </div>
              </div>
            </div>

            {/* STAGES 3 & 4: RESEARCH & REQUIREMENTS (Unlocked if Rank >= 3, 4) */}
            <div className={`glass-card rounded-2xl p-6 border transition-all ${
              currentRank < 3
                ? 'border-dashed border-gray-700/60 bg-[#14141C]/40 opacity-75'
                : 'border-borderSubtle'
            }`}>
              <div className="flex items-center justify-between border-b border-borderSubtle pb-2 mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-blue-400" />
                  Stages 3 & 4: Research, Requirements & Planning
                </h3>
                {currentRank < 3 ? (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Locked (Outsider Protection)
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                )}
              </div>

              {currentRank < 3 ? (
                <div className="py-4 text-center space-y-2 text-xs">
                  <Lock className="w-6 h-6 text-amber-400 mx-auto" />
                  <p className="text-subtext max-w-sm mx-auto">
                    Market research data and project requirement specifications are locked for public security.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">🔎 Literature & Competitor Analysis</span>
                    <p className="text-slate-200">Benchmarked against existing legacy APIs; delivers 4x throughput efficiency.</p>
                  </div>
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">📋 Technical Requirements (PRD)</span>
                    <p className="text-slate-200">REST microservices, sub-150ms execution latency, and role-based ACLs.</p>
                  </div>
                </div>
              )}
            </div>

            {/* STAGES 5 & 6: ARCHITECTURE & PROTOTYPE (Unlocked if Rank >= 5, 6) */}
            <div className={`glass-card rounded-2xl p-6 border transition-all ${
              currentRank < 5
                ? 'border-dashed border-gray-700/60 bg-[#14141C]/40 opacity-75'
                : 'border-borderSubtle'
            }`}>
              <div className="flex items-center justify-between border-b border-borderSubtle pb-2 mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Stages 5 & 6: Architecture, Design & Proof of Concept
                </h3>
                {currentRank < 5 ? (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Architecture Locked
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                  </span>
                )}
              </div>

              {currentRank < 5 ? (
                <div className="py-5 text-center space-y-3">
                  <Lock className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white">System Architecture & Blueprint Sealed</h4>
                  <p className="text-xs text-subtext max-w-md mx-auto">
                    To prevent unauthorized copying of this innovation, internal system diagrams are protected until Stage 5.
                  </p>
                  <button
                    onClick={handleRequestAccess}
                    disabled={accessRequested}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-400 text-xs font-bold inline-flex items-center gap-2"
                  >
                    {accessRequested ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Access Request Sent to Innovator
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Request Faculty / Partner IP Access
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">🏗️ System Architecture Flow</span>
                    <div className="p-3 rounded-xl bg-[#0A0A0F] font-mono text-[11px] text-emerald-400 border border-borderSubtle">
                      Client Frontend → API Gateway → AI Microservice → Supabase Postgres Ledger
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {demo_url && (
                      <a href={demo_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 text-xs">
                        <ExternalLink className="w-3.5 h-3.5" /> Launch Working Prototype
                      </a>
                    )}
                    {github_url && (
                      <a href={github_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-xl bg-white/5 text-subtext hover:text-white font-medium flex items-center gap-2 text-xs">
                        <Github className="w-3.5 h-3.5" /> Repository
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* STAGES 7 & 8: MVP & TESTING (Unlocked if Rank >= 7, 8) */}
            <div className={`glass-card rounded-2xl p-6 border transition-all ${
              currentRank < 7
                ? 'border-dashed border-gray-700/60 bg-[#14141C]/40 opacity-75'
                : 'border-borderSubtle'
            }`}>
              <div className="flex items-center justify-between border-b border-borderSubtle pb-2 mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Stages 7 & 8: MVP Engineering & User Testing
                </h3>
                {currentRank < 7 ? (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Upcoming Stage
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active MVP
                  </span>
                )}
              </div>

              {currentRank >= 7 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">⚙️ MVP Feature Set</span>
                    <p className="text-slate-200">Core engine deployed with automated background batch processing.</p>
                  </div>
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">🔬 Testing & QA Benchmarks</span>
                    <p className="text-slate-200">96.4% test suite pass rate across 500 simulated user requests.</p>
                  </div>
                </div>
              )}
            </div>

            {/* STAGES 9, 10 & 11: PILOT, FINAL PRODUCT, SCALE (Unlocked if Rank >= 9, 10, 11) */}
            <div className={`glass-card rounded-2xl p-6 border transition-all ${
              currentRank < 9
                ? 'border-dashed border-gray-700/60 bg-[#14141C]/40 opacity-75'
                : 'border-borderSubtle'
            }`}>
              <div className="flex items-center justify-between border-b border-borderSubtle pb-2 mb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-amber-400" />
                  Stages 9, 10 & 11: Pilot, Launch & Scale
                </h3>
                {currentRank < 9 ? (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Future Milestones
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Commercial Scale
                  </span>
                )}
              </div>

              {currentRank >= 9 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">🌍 Pilot Sandbox</span>
                    <p className="text-slate-200">{college} Innovation Lab</p>
                  </div>
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">🚀 Launch Status</span>
                    <p className="text-slate-200">Production Live Deployment</p>
                  </div>
                  <div>
                    <span className="text-subtext font-semibold uppercase tracking-wider block mb-1">📈 Scale & Patent</span>
                    <p className="text-slate-200">Provisional IP Granted</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: AI Score Breakdown */}
        {activeTab === 'ai_scores' && (
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-subtext">Composite AI Score</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {ai_scores.overall_score || 88} / 100
                </div>
              </div>
              <Award className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#0A0A0F] border border-borderSubtle flex justify-between">
                <span>Innovation Score</span>
                <span className="font-bold text-emerald-400">{ai_scores.innovation_score || 85}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0F] border border-borderSubtle flex justify-between">
                <span>Feasibility Score</span>
                <span className="font-bold text-blue-400">{ai_scores.feasibility_score || 80}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0F] border border-borderSubtle flex justify-between">
                <span>Impact Score</span>
                <span className="font-bold text-emerald-400">{ai_scores.impact_score || 90}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0A0F] border border-borderSubtle flex justify-between">
                <span>Technical Score</span>
                <span className="font-bold text-cyan-400">{ai_scores.technical_score || 88}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-borderSubtle flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
          >
            Close Document View
          </button>
        </div>
      </div>
    </div>
  );
}
