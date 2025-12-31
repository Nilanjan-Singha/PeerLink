"use client";

import React from 'react';
import { Mic, Video, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const ActionBar: React.FC = () => {
  const { 
    mode, 
    setMode, 
    startSearch, 
    isSearching, 
    selectedTopicId 
  } = useApp();

  const topicSelected = selectedTopicId !== null;

  return (
    <div className="flex flex-col items-center gap-12 mt-12 mb-20">
      {/* Central Mode Toggle */}
      <div className="bg-[#0f172a] rounded-full p-1.5 flex border border-white/10 shadow-xl">
        <button
          onClick={() => setMode('voice')}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
            mode === 'voice' 
            ? 'bg-white text-slate-900 shadow-lg' 
            : 'text-white/40 hover:text-white/70'
          }`}
        >
          <Mic className="w-4 h-4" />
          Voice Only
        </button>
        <button
          onClick={() => setMode('video')}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all ${
            mode === 'video' 
            ? 'bg-[#f472b6] text-white shadow-lg' 
            : 'text-white/40 hover:text-white/70'
          }`}
        >
          <Video className="w-4 h-4" />
          Video
        </button>
      </div>

      {/* Start Matching Button */}
      <div className="w-full max-w-xl px-4">
        <button
          onClick={startSearch}
          disabled={isSearching || !topicSelected}
          className={`
            w-full flex items-center justify-center gap-3 px-12 py-6 rounded-full font-heading font-extrabold text-lg uppercase tracking-[0.15em] transition-all
            ${isSearching || !topicSelected 
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' 
              : 'border-white border-2 bg-green-500 text-white hover:scale-[1.02] active:scale-95 hover:brightness-110'}
          `}
        >
          <Zap className={`w-6 h-6 ${!topicSelected ? 'opacity-30' : 'fill-white'}`} />
          {isSearching ? 'Searching...' : 'Start Matching'}
        </button>
        
        {!topicSelected && !isSearching && (
          <p className="text-center text-white/30 text-[10px] mt-4 font-bold uppercase tracking-widest">
            Select a category above to find your match
          </p>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
