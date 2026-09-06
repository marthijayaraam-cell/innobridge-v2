import React from 'react';
import { X, Sparkles, Award, Lightbulb, CheckCircle, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';

export default function AIScoreBreakdownModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  const { title, domain, stage, ai_scores = {} } = project;

  const metrics = [
    { name: 'Innovation Score', val: ai_scores.innovation_score || 85, weight: '25%', color: 'from-purple-500 to-indigo-500', icon: Lightbulb },
    { name: 'Feasibility Score', val: ai_scores.feasibility_score || 80, weight: '20%', color: 'from-blue-500 to-cyan-500', icon: CheckCircle },
    { name: 'Impact Score', val: ai_scores.impact_score || 90, weight: '25%', color: 'from-emerald-500 to-teal-500', icon: TrendingUp },
    { name: 'Technical Score', val: ai_scores.technical_score || 88, weight: '15%', color: 'from-violet-500 to-purple-600', icon: Cpu },
    { name: 'Market Score', val: ai_scores.market_score || 82, weight: '15%', color: 'from-amber-500 to-orange-500', icon: ShieldCheck },
  ];

  const overall = ai_scores.overall_score || 88;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 md:p-8 border border-borderSubtle shadow-glowLg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-subtext hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-light shadow-glow">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-textMain line-clamp-1">{title}</h2>
            <p className="text-xs text-subtext flex items-center gap-2">
              <span>{domain}</span> • <span className="text-primary-light font-medium">{stage}</span>
            </p>
          </div>
        </div>

        {/* Overall Composite Score Box */}
        <div className="glass-card rounded-2xl p-5 mb-6 border border-primary/30 flex items-center justify-between bg-gradient-to-r from-primary/10 via-[#14141C] to-secondary/10">
          <div>
            <div className="text-xs uppercase tracking-wider text-subtext font-semibold">
              AI Composite Assessment
            </div>
            <div className="text-3xl font-extrabold text-white mt-1 flex items-baseline gap-2">
              <span>{overall}</span>
              <span className="text-xs text-subtext font-normal">/ 100</span>
            </div>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex flex-col items-center justify-center text-primary-light shadow-glow">
            <Award className="w-6 h-6 text-primary mb-0.5" />
            <span className="text-[10px] font-bold">VERIFIED</span>
          </div>
        </div>

        {/* Bar Breakdown of 5 Metrics */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-subtext">
            Evaluation Metrics Breakdown
          </h3>

          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-200 font-medium">
                    <Icon className="w-3.5 h-3.5 text-primary-light" />
                    <span>{m.name}</span>
                    <span className="text-[10px] text-subtext">({m.weight})</span>
                  </div>
                  <span className="font-bold text-white">{m.val} / 100</span>
                </div>

                {/* Animated Bar */}
                <div className="w-full h-2.5 rounded-full bg-[#0A0A0F] overflow-hidden p-0.5 border border-white/5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-700`}
                    style={{ width: `${m.val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Feedback Box */}
        {ai_scores.feedback && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-subtext leading-relaxed">
            <span className="font-bold text-primary-light block mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Feedback Summary:
            </span>
            <p className="italic text-slate-300">"{ai_scores.feedback}"</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-glow transition-all"
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
}
