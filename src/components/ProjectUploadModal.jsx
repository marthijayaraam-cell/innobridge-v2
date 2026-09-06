import React, { useState } from 'react';
import { X, Sparkles, Loader2, ArrowRight, CheckCircle2, Lock, Globe, Code, Link as LinkIcon, Cpu, Award, Lightbulb } from 'lucide-react';
import { scoreProject } from '../lib/aiScoring';
import { ALL_11_STAGES } from '../lib/supabase';

const DOMAINS = [
  'AI & Machine Learning',
  'CleanTech & Energy',
  'HealthTech',
  'Blockchain & FinTech',
  'AgriTech',
  'EdTech & Neuro',
  'Cybersecurity',
  'Robotics & Hardware',
  'SaaS & Software'
];

export default function ProjectUploadModal({ isOpen, onClose, onProjectCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: 'AI & Machine Learning',
    stage: 'PoC / Prototype',
    demo_url: '',
    github_url: '',
    visibility: 'public'
  });

  const [loadingAI, setLoadingAI] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showResultsCard, setShowResultsCard] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setLoadingAI(true);
    setAiResult(null);
    setShowResultsCard(false);

    try {
      // 1. Run AI Evaluation Engine
      const scores = await scoreProject(formData);
      setAiResult(scores);
      setLoadingAI(false);
      setShowResultsCard(true);

      // 2. Prepare payload
      const projectPayload = {
        title: formData.title,
        description: formData.description,
        domain: formData.domain,
        stage: formData.stage,
        demo_url: formData.demo_url,
        github_url: formData.github_url,
        visibility: formData.visibility,
        ai_scores: scores,
        avg_faculty_rating: 0,
        created_at: new Date().toISOString()
      };

      // 3. Callback to parent component / Auth store to persist to Supabase
      await onProjectCreated(projectPayload);

    } catch (err) {
      console.error(err);
      setLoadingAI(false);
    }
  };

  const handleCloseAndReset = () => {
    setShowResultsCard(false);
    setAiResult(null);
    setFormData({
      title: '',
      description: '',
      domain: 'AI & Machine Learning',
      stage: 'PoC / Prototype',
      demo_url: '',
      github_url: '',
      visibility: 'public'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111827] w-full max-w-2xl rounded-2xl p-6 md:p-8 border border-[#334155] shadow-card relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleCloseAndReset}
          className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Submit Innovation Project</h2>
            <p className="text-xs text-slate-400">Multi-parameter LLM analysis across 5 core startup metrics.</p>
          </div>
        </div>

        {/* Loading State */}
        {loadingAI ? (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <Cpu className="w-7 h-7 text-emerald-400 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Analyzing Your Project...</h3>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Evaluating innovation feasibility, technical depth, market demand & societal impact.
              </p>
            </div>
          </div>
        ) : showResultsCard && aiResult ? (
          /* Impressive Expert AI Results Card */
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 rounded-xl bg-[#0B1120] border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">AI Composite Evaluation</span>
                <div className="text-3xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                  <span className="text-emerald-400">{(aiResult.overall_score / 10).toFixed(1)}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 10</span>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-lg badge-ai font-extrabold text-xs flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" /> Verified Score: {aiResult.overall_score}/100
              </div>
            </div>

            {/* 5 Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-[#0B1120] border border-[#334155] text-center">
                <span className="text-slate-400 text-[10px] block">Innovation</span>
                <span className="font-bold text-emerald-400 text-sm">{aiResult.innovation_score}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0B1120] border border-[#334155] text-center">
                <span className="text-slate-400 text-[10px] block">Feasibility</span>
                <span className="font-bold text-blue-400 text-sm">{aiResult.feasibility_score}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0B1120] border border-[#334155] text-center">
                <span className="text-slate-400 text-[10px] block">Impact</span>
                <span className="font-bold text-emerald-400 text-sm">{aiResult.impact_score}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0B1120] border border-[#334155] text-center">
                <span className="text-slate-400 text-[10px] block">Technical</span>
                <span className="font-bold text-cyan-400 text-sm">{aiResult.technical_score}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#0B1120] border border-[#334155] text-center">
                <span className="text-slate-400 text-[10px] block">Market</span>
                <span className="font-bold text-amber-400 text-sm">{aiResult.market_score}</span>
              </div>
            </div>

            {/* Written Advice Card */}
            <div className="p-4 rounded-xl bg-[#0B1120] border border-[#334155] text-xs text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> AI Mentor Expert Commentary:
              </span>
              <p className="italic text-slate-200 leading-relaxed">"{aiResult.feedback}"</p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCloseAndReset}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Publish to Feed & Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. EcoPulse — Solar Micro-Grid Controller"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Description & Technical Summary *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe the problem, key innovation, architecture, tech stack, and impact..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
              />
            </div>

            {/* Grid: Domain & Stage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Domain / Category
                </label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-sm font-semibold outline-none transition-colors cursor-pointer"
                >
                  {DOMAINS.map((d) => (
                    <option key={d} value={d} className="bg-[#111827] text-white py-2 font-semibold text-sm">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Development Stage (11-Stage Pipeline)
                </label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-sm font-semibold outline-none transition-colors cursor-pointer"
                >
                  {ALL_11_STAGES.map((s, idx) => (
                    <option key={s} value={s} className="bg-[#111827] text-white py-2 font-semibold text-sm">
                      Stage {idx + 1}: {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid: Demo URL & Github */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <LinkIcon className="w-3.5 h-3.5 text-electricCyan" /> Live Demo Link
                </label>
                <input
                  type="url"
                  placeholder="https://my-demo-app.vercel.app"
                  value={formData.demo_url}
                  onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5 text-electricCyan" /> GitHub Code Repository
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/user/project"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B1120] border border-[#334155] focus:border-emerald-500 text-slate-100 text-xs outline-none transition-colors"
                />
              </div>
            </div>

            {/* Visibility Settings */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Visibility Setting
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visibility: 'public' })}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    formData.visibility === 'public'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-[#0B1120] border-[#334155] text-slate-400 hover:text-white'
                  }`}
                >
                  <Globe className="w-4 h-4 text-electricCyan" />
                  <div className="text-left">
                    <div className="text-xs font-bold">Public Feed</div>
                    <div className="text-[10px] opacity-70">Visible to companies & faculty</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, visibility: 'private' })}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    formData.visibility === 'private'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-[#0B1120] border-[#334155] text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4 text-electricCyan" />
                  <div className="text-left">
                    <div className="text-xs font-bold">College Private</div>
                    <div className="text-[10px] opacity-70">Only visible to your faculty</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#334155]">
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Analyze & Submit Project
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
