'use client';

import React, { useEffect, useState } from 'react';
import { Bus } from 'lucide-react';

export default function BusScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
        setIsVisible(scrollTop > 60);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Background Track */}
      <div className="w-full h-1 sm:h-1.5 bg-slate-900/10 backdrop-blur-xs relative overflow-visible">
        {/* Fill Gradient Bar */}
        <div
          className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-[width] duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Floating Mini Bus Head */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-[left] duration-75 ease-out flex items-center justify-center pointer-events-auto"
          style={{ left: `${Math.max(2, Math.min(98, scrollProgress))}%` }}
        >
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-900/90 border border-amber-400/60 text-amber-300 text-[10px] font-bold shadow-md backdrop-blur-md transform hover:scale-110 transition-transform">
            <span className="text-xs animate-pulse">🚌</span>
            <span className="hidden sm:inline text-[9px] text-white font-medium">
              {Math.round(scrollProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
