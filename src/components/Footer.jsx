import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.svg';
import { Linkedin, Github, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    console.log("InnoBridge Newsletter Subscription Request:", newsletterEmail);
    setSubscribed(true);
    setNewsletterEmail('');

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full border-t border-slate-800 bg-[#070B14] text-slate-400 text-xs font-normal relative z-30">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 pt-12 pb-8 space-y-12">
        
        {/* 4-Column Responsive Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1 — Brand */}
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img 
                src={logoImg} 
                alt="InnoBridge Logo" 
                className="h-7 w-7 object-contain rounded-md select-none shrink-0" 
              />
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                InnoBridge
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded-md bg-blue-500/20 text-[#70B5F9] font-semibold border border-blue-500/30">
                  v2.0
                </span>
              </span>
            </Link>

            <p className="text-xs font-semibold text-[#70B5F9]">
              Showcase. Get Scored. Get Discovered.
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              The AI-powered platform connecting student innovators with faculty and industry.
            </p>
          </div>

          {/* Column 2 — Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <Link to="/feed" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  Innovation Feed
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  Leaderboard & Rankings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/student" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  Workspace & AI Audit
                </Link>
              </li>
              <li>
                <Link to="/auth?tab=signup&role=student" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  Join as Student
                </Link>
              </li>
              <li>
                <Link to="/auth?tab=signup&role=company" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  Join as Company / Scout
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 font-normal">
              <li>
                <a href="#about" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  About InnoBridge
                </a>
              </li>
              <li>
                <a href="#ai-scoring" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  How AI Scoring Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#70B5F9] hover:underline transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="mailto:marthijayaraam@gmail.com" className="hover:text-[#70B5F9] hover:underline transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Connect & Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Connect
            </h4>

            <div className="space-y-2">
              <a
                href="mailto:marthijayaraam@gmail.com"
                className="text-xs text-slate-300 hover:text-[#70B5F9] hover:underline transition-colors flex items-center gap-2 font-medium"
              >
                <Mail className="w-4 h-4 text-[#70B5F9]" />
                <span>marthijayaraam@gmail.com</span>
              </a>

              {/* Social Icons - Flat style, no colored boxes, hover to brand blue */}
              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://www.linkedin.com/in/marthi-jayaraam-9a50a8336"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-[#70B5F9] transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/marthijayaraam-cell"
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Newsletter Signup Form */}
            <div className="pt-2 space-y-2">
              <span className="text-[11px] text-slate-400 block font-medium">
                Subscribe to Innovation Digest
              </span>
              {subscribed ? (
                <div className="px-3 py-2 rounded-md bg-[#0A66C2]/15 border border-[#0A66C2]/40 text-[#70B5F9] text-xs flex items-center gap-1.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#70B5F9]" />
                  <span>Subscribed! Thank you.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#111827] border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-[#0A66C2] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 min-h-[40px] rounded-md bg-[#0A66C2] hover:bg-[#378FE9] text-white text-xs font-semibold shrink-0 transition-colors flex items-center justify-center"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar Separated by Thin Border */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-normal">
          <div>
            © 2026 InnoBridge. Built by{' '}
            <a 
              href="https://github.com/marthijayaraam-cell" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-300 font-semibold hover:text-[#70B5F9] hover:underline transition-colors"
            >
              Marthi Jayaraam
            </a>.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => {
                sessionStorage.removeItem('innobridge_intro_played');
                window.location.reload();
              }}
              className="text-[#70B5F9] font-semibold hover:underline transition-colors flex items-center gap-1"
              title="Replay website opening logo animation"
            >
              <span>Replay Intro</span>
            </button>
            <span className="text-slate-700">•</span>
            <a href="#privacy" className="hover:text-slate-200 hover:underline transition-colors">
              Privacy Policy
            </a>
            <span className="text-slate-700">•</span>
            <a href="#terms" className="hover:text-slate-200 hover:underline transition-colors">
              Terms of Service
            </a>
            <span className="text-slate-700">•</span>
            <a href="#security" className="hover:text-slate-200 hover:underline transition-colors">
              Security
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
