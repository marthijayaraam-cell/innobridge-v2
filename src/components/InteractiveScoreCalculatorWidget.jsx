import React, { useState } from 'react';
import { Sparkles, Award, Calculator, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { calculateStudentInnovationScore, getStageBonus } from '../lib/scoreCalculator';

const STAGE_OPTIONS = [
  { name: 'Stage 1: Idea Formulation', bonus: 0 },
  { name: 'Stage 4: Requirements & PRD', bonus: 6 },
  { name: 'Stage 6: PoC / Prototype', bonus: 10 },
  { name: 'Stage 9: Pilot Deployment', bonus: 16 },
  { name: 'Stage 11: Launch & Scale', bonus: 20 },
];

export default function InteractiveScoreCalculatorWidget() {
  const [projectCount, setProjectCount] = useState(3);
  const [aiScore, setAiScore] = useState(88);
  const [facultyRating, setFacultyRating] = useState(4.5);
  const [selectedStage, setSelectedStage] = useState(STAGE_OPTIONS[2]);

  // Calculate live score
  const mockProjectsList = Array.from({ length: projectCount }).map(() => ({
    ai_scores: { overall_score: aiScore },
    avg_faculty_rating: facultyRating,
    stage: selectedStage.name
  }));

  const liveInnovationScore = calculateStudentInnovationScore(mockProjectsList);

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-primary/40 shadow-glowLg relative overflow-hidden bg-gradient-to-br from-primary/10 via-[#14141C] to-secondary/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-borderSubtle pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-xs font-bold text-primary-light mb-2">
            <Calculator className="w-3.5 h-3.5 text-primary" />
            <span>Interactive Score Simulator</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">Test Your Innovation Rank</h3>
          <p className="text-xs text-subtext mt-1">
            Drag sliders to simulate your student score on university leaderboards.
          </p>
        </div>

        {/* Live Calculated Output */}
        <div className="flex items-center gap-4 bg-[#0A0A0F] p-4 rounded-2xl border border-primary/40 shadow-glow flex-shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-subtext block">Simulated Score</span>
            <span className="text-3xl font-extrabold text-primary-light">{liveInnovationScore}</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-glowSm">
            <Award className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Slider 1: Project Count */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#0A0A0F]/60 border border-borderSubtle">
          <div className="flex justify-between font-bold text-slate-200">
            <span>Submissions Count</span>
            <span className="text-primary-light font-extrabold">{projectCount} Project(s)</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={projectCount}
            onChange={(e) => setProjectCount(Number(e.target.value))}
            className="w-full accent-primary bg-[#14141C] h-2 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-subtext flex justify-between">
            <span>1 Project (+10 pts)</span>
            <span>10 Projects (+100 pts)</span>
          </div>
        </div>

        {/* Slider 2: AI Score */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#0A0A0F]/60 border border-borderSubtle">
          <div className="flex justify-between font-bold text-slate-200">
            <span>Avg AI Evaluation Score</span>
            <span className="text-purple-400 font-extrabold">{aiScore} / 100</span>
          </div>
          <input
            type="range"
            min="60"
            max="100"
            value={aiScore}
            onChange={(e) => setAiScore(Number(e.target.value))}
            className="w-full accent-purple-500 bg-[#14141C] h-2 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-subtext flex justify-between">
            <span>60 AI Base</span>
            <span>100 Perfect AI Index</span>
          </div>
        </div>

        {/* Slider 3: Faculty Rating */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#0A0A0F]/60 border border-borderSubtle">
          <div className="flex justify-between font-bold text-slate-200">
            <span>Faculty Review Star Rating</span>
            <span className="text-amber-400 font-extrabold">{facultyRating} Stars ⭐</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="5.0"
            step="0.1"
            value={facultyRating}
            onChange={(e) => setFacultyRating(Number(e.target.value))}
            className="w-full accent-amber-400 bg-[#14141C] h-2 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-subtext flex justify-between">
            <span>1.0 Star</span>
            <span>5.0 Stars (Max 75 pts)</span>
          </div>
        </div>

        {/* Dropdown: Stage Bonus */}
        <div className="space-y-2 p-4 rounded-2xl bg-[#0A0A0F]/60 border border-borderSubtle">
          <div className="flex justify-between font-bold text-slate-200">
            <span>Development Stage Bonus</span>
            <span className="text-emerald-400 font-extrabold">+{selectedStage.bonus} Bonus Pts</span>
          </div>
          <select
            value={selectedStage.name}
            onChange={(e) => {
              const matched = STAGE_OPTIONS.find(s => s.name === e.target.value);
              if (matched) setSelectedStage(matched);
            }}
            className="w-full p-2.5 rounded-xl bg-[#14141C] border border-borderSubtle text-xs text-white outline-none focus:border-primary"
          >
            {STAGE_OPTIONS.map((stg) => (
              <option key={stg.name} value={stg.name} className="bg-[#14141C]">
                {stg.name} (+{stg.bonus} pts)
              </option>
            ))}
          </select>
          <div className="text-[10px] text-subtext">Higher development stages unlock larger formula multipliers.</div>
        </div>
      </div>
    </div>
  );
}
