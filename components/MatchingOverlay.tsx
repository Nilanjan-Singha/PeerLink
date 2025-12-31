"use client";

import React, { useEffect, useState } from 'react';
import { X, ShieldCheck, Zap, Radio } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const MatchingOverlay: React.FC = () => {
  const { 
    cancelSearch, 
    mode, 
    currentTopic 
  } = useApp();

  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-25 bg-[#0b1120]/98 backdrop-blur-2xl flex flex-col items-center justify-center text-white p-6 overflow-hidden animate-in fade-in duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#c259ee]/10 rounded-full blur-[120px]"  />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#17bfec]/10 rounded-full blur-[120px]" />

      <button 
        onClick={cancelSearch}
        className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-all hover:rotate-90 z-20"
      >
        <X className="w-8 h-8 text-white/50" />
      </button>

      <div className="relative w-72 h-72 mb-16 mt-20">
        {/* Pulsing Rings */}
        <div className="absolute inset-0 border-2 border-[#c259ee]/20 rounded-full animate-[ping_3s_infinite]" />
        <div className="absolute inset-0 border-2 border-[#17bfec]/10 rounded-full animate-[ping_4s_infinite_1s]" />
        
        {/* Center Visual */}
        <div className="absolute inset-6 start-button-gradient rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(194,89,238,0.3)] border-4 border-white/10">
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-20 h-20 text-white fill-white animate-pulse" />
          </div>
        </div>
        
        {/* Orbital dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#c259ee] rounded-full shadow-[0_0_15px_#c259ee] animate-[spin_5s_linear_infinite]" style={{ transformOrigin: '50% 144px' }} />
      </div>

      <div className="text-center max-w-xl z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Matching Protocol Active</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
          Finding your <span className=" bg-clip-text text-purple-600">{currentTopic?.label}</span> peer{dots}
        </h2>
        <p className="text-white/40 font-medium text-lg mb-12">
          Searching through 1,420 online engineers for the perfect match.
        </p>

        {/* <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-[#1e293b]/40 border border-white/5 p-5 rounded-[2rem] flex items-center gap-4 min-w-[200px]">
            <div className="p-3 bg-emerald-500/10 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-extrabold mb-0.5">Privacy</p>
              <p className="text-sm font-bold text-white/90 tracking-tight">E2E Encrypted</p>
            </div>
          </div>
          
          <div className="bg-[#1e293b]/40 border border-white/5 p-5 rounded-[2rem] flex items-center gap-4 min-w-[200px]">
            <div className="p-3 bg-indigo-500/10 rounded-2xl">
              <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-extrabold mb-0.5">Mode</p>
              <p className="text-sm font-bold text-white/90 tracking-tight capitalize">{mode} Session</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className="mt-24 flex gap-6 overflow-hidden py-4 w-full opacity-30 select-none">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="shrink-0 flex items-center gap-3 text-white whitespace-nowrap animate-marquee">
            <span className="font-mono font-extrabold text-sm tracking-tighter italic">CONNECTING_DEV_{Math.floor(Math.random() * 9999)}</span>
            <div className="w-2 h-2 bg-indigo-500 rounded-full" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default MatchingOverlay;
