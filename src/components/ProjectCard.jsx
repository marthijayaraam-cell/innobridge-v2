import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  ExternalLink, 
  Github, 
  Building2, 
  GraduationCap, 
  ChevronRight,
  Send,
  CheckCircle,
  FileText,
  Award
} from 'lucide-react';

export default function ProjectCard({ 
  project, 
  userRole = 'student', 
  onReview = null, 
  onExpressInterest = null,
  onViewDetails = null
}) {
  const [interestSubmitted, setInterestSubmitted] = useState(false);

  const {
    id,
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

  const rawScore = ai_scores?.overall_score || 88;
  // Format as decimal AI score (e.g. 8.8) or out of 100
  const formattedAIScore = (rawScore / 10).toFixed(1);

  // Stage badge colors according to brand color language:
  // Green: Launched / Scale / Final Product
  // Amber: Prototype / Pilot / Requirements / MVP / Testing
  // Blue / Indigo: Idea / Problem / Research / Architecture
  const getStageBadgeStyle = (stg) => {
    if (stg.includes('Launch') || stg.includes('Final Product') || stg === 'Launched') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (stg.includes('Pilot') || stg.includes('Prototype') || stg.includes('MVP') || stg.includes('Testing') || stg.includes('Requirements')) {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  const handleInterestClick = (e) => {
    e.stopPropagation();
    if (onExpressInterest) {
      onExpressInterest(project);
    }
    setInterestSubmitted(true);
    setTimeout(() => setInterestSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#111827] rounded-md p-4 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between relative group">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Domain Tag - GitHub Topic Tag Style */}
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            {domain}
          </span>

          <div className="flex items-center gap-2">
            {/* Stage Badge */}
            <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${getStageBadgeStyle(stage)}`}>
              {stage}
            </span>

            {/* Prominent AI Score Badge - Flat Green */}
            <div 
              onClick={() => onViewDetails && onViewDetails(project)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 cursor-pointer hover:bg-emerald-900/60 transition-colors"
              title="View AI 5-parameter evaluation breakdown"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">AI Score: {formattedAIScore}</span>
            </div>
          </div>
        </div>

        {/* Project Title */}
        <h3 
          onClick={() => onViewDetails && onViewDetails(project)}
          className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1 cursor-pointer flex items-center justify-between"
        >
          <span>{title}</span>
          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
        </h3>

        {/* Project Description */}
        <p 
          onClick={() => onViewDetails && onViewDetails(project)}
          className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4 cursor-pointer hover:text-slate-300 transition-colors font-normal"
        >
          {description}
        </p>

        {/* Student Name, College & Project ID Metadata */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5 truncate max-w-[200px]">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-300 truncate">{student_name}</span>
            <span className="text-slate-600">•</span>
            <span className="truncate text-slate-400">{college}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500 shrink-0">ID: {id?.slice(0, 6)}</span>
        </div>
      </div>

      {/* Footer Metrics & Role Actions */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between text-xs">
          {/* Faculty Stars */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(avg_faculty_rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium text-slate-300">
              {avg_faculty_rating > 0 ? avg_faculty_rating.toFixed(1) : 'Unrated'}
            </span>
            {reviews_count > 0 && (
              <span className="text-slate-500 text-[11px]">({reviews_count})</span>
            )}
          </div>

          <button
            onClick={() => onViewDetails && onViewDetails(project)}
            className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            IP & Stages
          </button>
        </div>


        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            {demo_url && (
              <a
                href={demo_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Role specific CTAs */}
          {userRole === 'faculty' && onReview && (
            <button
              onClick={() => onReview(project)}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              Review Project
            </button>
          )}

          {userRole === 'company' && (
            <button
              onClick={handleInterestClick}
              disabled={interestSubmitted}
              className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                interestSubmitted
                  ? 'bg-emerald-950/80 border border-emerald-800/60 text-emerald-300'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {interestSubmitted ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  Interest Saved
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Express Interest
                </>
              )}
            </button>
          )}

          {userRole === 'student' && (
            <button
              onClick={() => onViewDetails && onViewDetails(project)}
              className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors"
            >
              View Document
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
