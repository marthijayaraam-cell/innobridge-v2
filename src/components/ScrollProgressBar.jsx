import React, { useState, useEffect } from 'react';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary via-purple-500 via-cyan-400 to-emerald-400 transition-all duration-150 shadow-[0_0_10px_#7C3AED]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
