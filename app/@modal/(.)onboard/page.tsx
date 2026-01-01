"use client";

import React, { useState } from 'react';
import { ShieldCheck, Heart, Info, CheckCircle2, ArrowRight, Scale } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface OnboardingAcknowledgeProps {


}

const OnboardingAcknowledge: React.FC<OnboardingAcknowledgeProps> = () => {
  const {isOnboardingComplete, setIsOnboardingComplete } = useApp();

  const [ischecked, setIsChecked] = useState(false);
  const router = useRouter();

   if (isOnboardingComplete) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOnboardingComplete(true);

    // close modal
    router.replace('/'); 
  };

  return (
    <div className="fixed inset-0 z-[210] bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Container matching TopicCard's rounded style and border */}
      <div className="relative w-full max-w-2xl bg-[#0d0d14] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header Section with subtle gradient background */}
        <div className="relative p-8 pb-6 ">
            {/* Decorative background blur similar to TopicCard hover effect */}
            
            <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                    <h2 className="font-heading font-black text-3xl text-white mb-2 tracking-tight">
                        Community Code
                    </h2>
                    <p className="text-white/60 text-sm font-medium leading-relaxed max-w-md">
                        PeerLink is a professional learning space. We ask all engineers to agree to our core principles before joining a session.
                    </p>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-8">
          
          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <h4 className="font-heading font-bold text-white text-sm">Be Civil & Helpful</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                    Treat everyone with respect. Constructive feedback only.
                </p>
            </div>

            <div className="group p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                    <Info className="w-4 h-4 text-blue-400" />
                    <h4 className="font-heading font-bold text-white text-sm">Privacy First</h4>
                </div>
                <p className="text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                    Your data is never sold. Respect the privacy of your peers.
                </p>
            </div>
          </div>

          {/* Agreement Section */}
          <div className="pt-2 border-t border-white/5">
             <label className="flex items-start gap-4 cursor-pointer group select-none p-2 rounded-xl transition-colors hover:bg-white/5">
                <div className="relative flex items-center mt-0.5">
                    <input 
                        type="checkbox"
                        checked={ischecked}
                        onChange={() => setIsChecked(!ischecked)}
                        className="peer appearance-none w-6 h-6 rounded-lg border-2 border-white/20 bg-black/20 checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer"
                    />
                    <CheckCircle2 className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 left-1 top-1 pointer-events-none transition-all duration-300 transform peer-checked:scale-100 scale-50" />
                </div>
                <div className="space-y-1">
                    <span className="block text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                        I agree to the Community Standards
                    </span>
                    <span className="block text-xs text-white/40 leading-tight">
                        I understand that I am responsible for my own conduct during peer sessions.
                    </span>
                </div>
             </label>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            disabled={!ischecked}
            className={`
                w-full relative overflow-hidden group flex items-center justify-center gap-3 py-4 rounded-2xl font-heading font-black text-sm uppercase tracking-widest transition-all duration-300
                ${!ischecked
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50' 
                    : 'bg-white text-slate-900 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]'}
            `}
          >
            <span>Join Session</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${ischecked ? 'group-hover:translate-x-1' : ''}`} />
          </button>

        </form>
      </div>
    </div>
  );
};

export default OnboardingAcknowledge;
