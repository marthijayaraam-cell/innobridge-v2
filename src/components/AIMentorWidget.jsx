import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, Minimize2, Lightbulb, Compass, Award, Rocket, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AIMentorWidget({ currentProjectContext = null }) {
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const userName = profile?.full_name?.split(' ')[0] || 'Innovator';
  const userRole = profile?.role || 'student';
  const userCollege = profile?.college || profile?.company_name || 'InnoBridge Ecosystem';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${userName}! 👋 I am your **InnoBridge Personal Innovation Mentor**.\n\nAs a ${userRole.toUpperCase()} at ${userCollege}, I'm here to guide you through project development, AI scoring, stage progression (from PoC to MVP), and strategic ecosystem connections.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Role-based dynamic quick prompts
  const quickPrompts = userRole === 'faculty' ? [
    "How to evaluate student feasibility?",
    "Rubric for 11-stage progress",
    "Top high-impact projects today",
    "Grant validation criteria"
  ] : userRole === 'company' ? [
    "Filter top 5% AI score projects",
    "Sourcing AI/ML talent",
    "Pilot deployment checklist",
    "Schedule student interview"
  ] : [
    "🚀 How to reach MVP stage?",
    "📈 Elevate my AI Score to 90+",
    "💡 Pitch deck formula",
    "🏛️ How to get faculty sponsorship?"
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend = inputMessage) => {
    const text = textToSend.trim();
    if (!text) return;

    // User message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Context-aware AI responses
    setTimeout(() => {
      let aiResponseText = "";
      const lower = text.toLowerCase();

      if (lower.includes('mvp') || lower.includes('stage') || lower.includes('reach')) {
        aiResponseText = `🎯 **11-Stage Progression Plan for ${userName}**:\n\n1. **PoC -> MVP Transition**: Ensure your code is hosted on GitHub with an active demo link.\n2. **User Feedback**: Gather at least 5 faculty or peer reviews to validate core usability.\n3. **AI Score Boost**: Upload detailed architecture diagrams and security documentation to reach Stage 7 (MVP Development).`;
      } else if (lower.includes('score') || lower.includes('elevate') || lower.includes('90')) {
        aiResponseText = `📊 **How to Unlock a 90+ AI Score on InnoBridge**:\n\n• **Technical Quality (30%)**: Include clear setup instructions and unit tests.\n• **Feasibility (25%)**: Attach a working URL or prototype video link.\n• **Impact & Market (25%)**: Define target metrics (e.g. 10x speed, 50% cost savings).\n• **Faculty Endorsement (20%)**: Submit your project for faculty review to secure 4.5+ rating multipliers.`;
      } else if (lower.includes('pitch') || lower.includes('formula') || lower.includes('deck')) {
        const projTitle = currentProjectContext?.title || "your innovation";
        aiResponseText = `🗣️ **High-Impact Elevator Pitch for "${projTitle}"**:\n\n"We are tackling [Industry Problem] using a novel AI-driven approach. Currently at **${currentProjectContext?.stage || 'PoC / Prototype'}**, our system delivers [Core Benefit]. With an InnoBridge AI Score of **${currentProjectContext?.ai_scores?.overall_score || '90+'}**, we are ready for pilot deployment."`;
      } else if (lower.includes('faculty') || lower.includes('sponsorship') || lower.includes('rubric')) {
        if (userRole === 'faculty') {
          aiResponseText = `📋 **Faculty Review Rubric & Guidance**:\n\n• Focus on technical rigor, zero-knowledge security, and reproducible benchmarks.\n• Projects at Stage 6 (PoC) should be encouraged to publish live Vercel/GitHub demos.`;
        } else {
          aiResponseText = `🏛️ **Securing Faculty Endorsements**:\n\n1. Share your project link directly via the Faculty Dashboard.\n2. Highlight your project's AI evaluation breakdown and academic rigor.\n3. Schedule a 10-minute demo to review your PoC code with your advisor.`;
        }
      } else if (lower.includes('filter') || lower.includes('scout') || lower.includes('talent') || lower.includes('company')) {
        aiResponseText = `🏢 **Industry & Venture Talent Screening**:\n\nInnoBridge filters candidates by AI Innovation Score, stage maturity, and GitHub activity. Top performers receive instant interview invitations from tech firms and incubators!`;
      } else {
        aiResponseText = `Great inquiry, ${userName}! As your personal guide, I recommend focusing on your next milestone: **${currentProjectContext ? `Refining ${currentProjectContext.title}` : 'Upgrading your project documentation & GitHub repo'}**. Would you like a step-by-step checklist?`;
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Chat Panel */}
      {isOpen ? (
        <div className="bg-[#111827] w-96 max-w-[calc(100vw-2rem)] h-[510px] max-h-[82vh] rounded-2xl border border-[#334155] shadow-cardHover flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-3.5 bg-[#0B1120] border-b border-[#334155] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  AI Personal Guide
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-400 capitalize">{userRole} Ecosystem Mentor</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Active Context Banner */}
          {currentProjectContext ? (
            <div className="px-3 py-1.5 bg-emerald-500/10 border-b border-emerald-500/20 text-[10px] text-emerald-300 flex items-center justify-between">
              <span className="truncate max-w-[220px] font-medium">Focused: {currentProjectContext.title}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 font-bold text-[9px]">{currentProjectContext.stage}</span>
            </div>
          ) : (
            <div className="px-3 py-1 bg-slate-800/40 border-b border-[#334155] text-[10px] text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-emerald-400" />
              <span>Ask me anything about your projects, stage roadmap, or AI scores!</span>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
                      : 'bg-[#0B1120] border border-[#334155] text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[9px] opacity-60 text-right mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <Bot className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span className="text-[11px]">Personal AI Mentor is analyzing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-3 py-2 bg-[#0B1120] border-t border-[#334155] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-emerald-600/20 border border-[#334155] hover:border-emerald-500/40 text-[10px] text-slate-300 hover:text-emerald-300 transition-all shrink-0 font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-2.5 bg-[#0B1120] border-t border-[#334155] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask your AI Personal Guide..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#111827] border border-[#334155] text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        /* Collapsed Floating Widget */
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-emerald-500/30 transition-all duration-200 hover:scale-105 relative flex items-center gap-2 font-bold"
          title="Open Personal AI Innovation Guide"
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-xs hidden sm:inline">AI Personal Guide</span>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0B1120] animate-pulse" />
        </button>
      )}
    </div>
  );
}


