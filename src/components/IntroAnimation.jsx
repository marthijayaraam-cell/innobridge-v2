import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * IntroAnimation - Progressive Logo Formation Opening Showcase
 * Starts with a clean empty screen, slowly forms the hexagonal 'iB' logo
 * in sync with the loading progress bar, and smoothly transitions into the app.
 */
export default function IntroAnimation({ onComplete = null, forcePlay = false }) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showBrandText, setShowBrandText] = useState(false);

  useEffect(() => {
    // Check if intro has already played in this session (unless forcePlay is true)
    const hasPlayed = sessionStorage.getItem('innobridge_intro_played');
    if (hasPlayed && !forcePlay) {
      setVisible(false);
      if (onComplete) onComplete();
      return;
    }

    // Incremental progress timer from 0 to 100% over ~2.8s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [forcePlay]);

  // When progress reaches 100%, show final brand reveal briefly then exit
  useEffect(() => {
    if (progress === 100) {
      setShowBrandText(true);
      const exitTimer = setTimeout(() => {
        finishIntro();
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [progress]);

  const finishIntro = () => {
    setExiting(true);
    sessionStorage.setItem('innobridge_intro_played', 'true');
    setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 600);
  };

  if (!visible) return null;

  // Compute progressive opacity for logo facets based on loading bar %
  const leftStemOpacity = Math.min(1, progress / 30);
  const innerFacetsOpacity = progress > 25 ? Math.min(1, (progress - 25) / 35) : 0;
  const rightBCurveOpacity = progress > 55 ? Math.min(1, (progress - 55) / 45) : 0;

  // Scale logo smoothly from 0.6 to 1.0 according to progress
  const logoScale = 0.6 + (progress / 100) * 0.4;
  const glowIntensity = (progress / 100) * 0.5;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#070B14] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ease-in-out ${
        exiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Ambient Glow (Grows with progress) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#0A66C2] blur-[140px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: glowIntensity }}
      />

      {/* Subtle Background Cybernetic Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#70B5F9_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top Right Skip Button */}
      <button
        onClick={finishIntro}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700/70 text-slate-400 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors z-20 backdrop-blur-md"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#70B5F9]" />
      </button>

      {/* Central Screen Area: ONLY the Logo & Loading Bar */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 z-10 space-y-8">
        
        {/* Progressive SVG Logo Container */}
        <div
          className="relative flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `scale(${logoScale})` }}
        >
          {/* Subtle Outer Orbital Ring (Reveals as progress > 50%) */}
          <div
            className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-blue-500/20 border-t-[#70B5F9] animate-spin-slow pointer-events-none transition-opacity duration-500"
            style={{ opacity: progress > 40 ? (progress - 40) / 60 : 0 }}
          />

          {/* Hexagonal Logo Container Box */}
          <div
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#0B1120] border border-blue-500/30 p-5 flex items-center justify-center shadow-2xl transition-all duration-300"
            style={{
              boxShadow: `0 0 ${progress * 0.6}px rgba(10, 102, 194, ${glowIntensity * 0.8})`
            }}
          >
            {/* Custom Progressive Multi-Facet SVG Logo */}
            <svg
              viewBox="0 0 200 230"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full object-contain shrink-0 select-none"
              aria-label="InnoBridge Formed Logo"
            >
              {/* Left Stem ('i' foundation) */}
              <path
                d="M 97,14 L 43,45 C 33,51 26,62 26,74 L 26,148 C 26,160 33,171 43,177 L 97,208 L 97,184 L 52,158 C 45,154 40,146 40,138 L 40,84 C 40,76 45,68 52,64 L 97,38 Z"
                fill="#0C3B73"
                style={{
                  opacity: leftStemOpacity,
                  transition: 'opacity 0.2s ease-out'
                }}
              />

              {/* Inner Facets */}
              <polygon
                points="66,54 97,36 97,60 66,78"
                fill="#0066CC"
                style={{
                  opacity: innerFacetsOpacity,
                  transition: 'opacity 0.2s ease-out'
                }}
              />
              <polygon
                points="66,85 97,67 97,215 66,197"
                fill="#082C59"
                style={{
                  opacity: innerFacetsOpacity,
                  transition: 'opacity 0.2s ease-out'
                }}
              />

              {/* Right Azure Curve ('B' completion) */}
              <path
                d="M 105,14 L 157,44 C 168,50 175,62 175,74 C 175,86 168,97 157,103 L 142,111 L 159,119 C 170,125 177,137 177,149 C 177,162 170,173 159,179 L 105,210 L 105,185 L 147,161 C 153,158 157,151 157,144 C 157,137 153,130 147,127 L 124,114 L 105,114 L 105,94 L 124,94 L 145,82 C 151,79 155,72 155,65 C 155,58 151,51 145,48 L 105,25 Z"
                fill="#009BE8"
                style={{
                  opacity: rightBCurveOpacity,
                  transition: 'opacity 0.2s ease-out'
                }}
              />
            </svg>
          </div>
        </div>

        {/* Minimal Progress Bar & Percentage Below Logo */}
        <div className="w-56 sm:w-64 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>{progress === 100 ? 'READY' : 'LOADING'}</span>
            <span className="text-[#70B5F9] font-bold">{progress}%</span>
          </div>

          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#0A66C2] via-[#378FE9] to-[#70B5F9] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Brief Brand Name Unveil when 100% complete */}
        {showBrandText && (
          <div className="animate-fade-in text-center pt-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              InnoBridge
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#0A66C2] text-white font-mono font-bold">
                v2.0
              </span>
            </h1>
          </div>
        )}

      </div>
    </div>
  );
}
