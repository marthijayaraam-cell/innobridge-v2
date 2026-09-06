import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Building2, CheckCircle2, ArrowRight, Sparkles, BookOpen, Award } from 'lucide-react';

export default function AudienceInteractiveShowcase() {
  const [activeAudience, setActiveAudience] = useState('student'); // 'student' | 'faculty' | 'company'

  const audienceData = {
    student: {
      title: 'Build Your Innovation Portfolio & Get Scouted',
      badge: 'Student Innovators',
      icon: GraduationCap,
      color: 'from-purple-500 to-indigo-500',
      description: 'Upload your campus builds, receive instant 5-metric AI evaluation, rank on university leaderboards, and connect directly with venture funds.',
      features: [
        '11-stage project document lifecycle with IP protection locks',
        'Real-time automated AI score (Innovation, Feasibility, Technical, Impact)',
        'University leaderboard ranking with faculty endorsement',
        'Direct NDA access requests from industry hiring partners'
      ],
      ctaText: 'Start Uploading Projects',
      ctaRole: 'student'
    },
    faculty: {
      title: 'Audit Campus Research & Endorse Top Innovators',
      badge: 'University Faculty & Mentors',
      icon: ShieldCheck,
      color: 'from-blue-500 to-cyan-500',
      description: 'Review student project submissions across your department, provide 1-5 star academic ratings, and mentor student research into spin-off startups.',
      features: [
        'College-specific review dashboard for your institution',
        'Structured 1-5 star academic evaluation & qualitative commentary',
        'Stage approval & change request management workflow',
        'Track department-wide innovation scores & student performance'
      ],
      ctaText: 'Access Faculty Workspace',
      ctaRole: 'faculty'
    },
    company: {
      title: 'Scout Verified Campus Talent & High-Score IP',
      badge: 'Companies, VCs & Talent Scouts',
      icon: Building2,
      color: 'from-emerald-500 to-teal-500',
      description: 'Filter verified campus projects by domain and minimum AI score cutoff (85+), express hiring interest, and invest in early-stage student IP.',
      features: [
        'Filter by domain (AI/ML, HealthTech, CleanTech, Robotics, FinTech)',
        'Custom AI score threshold sliders (e.g. 85+ Top Tier Cutoff)',
        'One-click "Express Interest" saving candidates to pipeline',
        'Direct IP review request protocol for confidential early-stage ideas'
      ],
      ctaText: 'Explore Talent Pipeline',
      ctaRole: 'company'
    }
  };

  const current = audienceData[activeAudience];
  const Icon = current.icon;

  return (
    <div className="glass-card rounded-3xl p-6 md:p-10 border border-borderSubtle space-y-8">
      {/* Tab Switcher */}
      <div className="grid grid-cols-3 p-1.5 rounded-2xl bg-[#0A0A0F] border border-borderSubtle text-xs font-bold gap-1">
        <button
          onClick={() => setActiveAudience('student')}
          className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAudience === 'student'
              ? 'bg-purple-500 text-white shadow-glowSm'
              : 'text-subtext hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="hidden sm:inline">For Students</span>
        </button>

        <button
          onClick={() => setActiveAudience('faculty')}
          className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAudience === 'faculty'
              ? 'bg-blue-500 text-white shadow-glowSm'
              : 'text-subtext hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">For Colleges & Faculty</span>
        </button>

        <button
          onClick={() => setActiveAudience('company')}
          className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeAudience === 'company'
              ? 'bg-emerald-500 text-[#0A0A0F] shadow-glowSm font-extrabold'
              : 'text-subtext hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span className="hidden sm:inline">For Industry & VCs</span>
        </button>
      </div>

      {/* Content Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fade-in">
        <div className="space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-200`}>
            <Icon className="w-4 h-4 text-primary-light" />
            <span>{current.badge}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-subtext leading-relaxed">
            {current.description}
          </p>

          <Link
            to={`/auth?tab=signup&role=${current.ctaRole}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-glow transition-all hover:scale-105"
          >
            <span>{current.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature List */}
        <div className="space-y-3 bg-[#0A0A0F] p-6 rounded-2xl border border-borderSubtle">
          <h4 className="text-xs font-bold text-subtext uppercase tracking-wider mb-2">
            Key Capabilities & Features
          </h4>
          {current.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
