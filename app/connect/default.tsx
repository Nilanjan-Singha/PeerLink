"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, Maximize2, Shield, Monitor, 
  Smile, Hand, Users 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function CallPage() {
  const router = useRouter();
  const { mode, currentTopic, isConnected, hangup } = useApp();

  // Local call state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(mode === 'voice');
  const [isSpeakingPeer, setIsSpeakingPeer] = useState(false);

  // 1. Safety Check: If no active connection/topic, redirect home
  useEffect(() => {
    if (!isConnected || !currentTopic) {
      router.replace('/');
    }
  }, [isConnected, currentTopic, router]);

  // Mock speaking animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSpeakingPeer(Math.random() > 0.7);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleHangup = () => {
    hangup(); // Reset global state
    router.replace('/'); // Go back home
  };

  // Prevent rendering if redirecting
  if (!isConnected || !currentTopic) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-[#0b1120] flex flex-col overflow-hidden font-sans">
      
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px]" 
          style={{ backgroundColor: currentTopic.color }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] opacity-50" 
          style={{ backgroundColor: currentTopic.color }}
        />
      </div>

      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-30 bg-gradient-to-b from-black/40 to-transparent">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/20" style={{ backgroundColor: currentTopic.color }}>
             <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-white font-heading font-black text-xl tracking-tight">{currentTopic.label}</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Live Technical Session</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">E2E Encrypted</span>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="flex-grow flex flex-col md:flex-row gap-6 p-6 md:p-12 items-center justify-center relative z-10 mt-16 md:mt-0">
        
        {/* Peer Video */}
        <div className={`
          flex-grow w-full max-w-2xl aspect-video md:aspect-square lg:aspect-video rounded-[2.5rem] bg-[#1e293b]/30 backdrop-blur-sm relative overflow-hidden transition-all duration-500 border border-white/5 shadow-2xl
          ${isSpeakingPeer ? 'ring-4 ring-emerald-500/50 scale-[1.01]' : ''}
        `}>
          {mode === 'video' ? (
            <img 
              src="https://picsum.photos/seed/peer-vid/1280/720" 
              className="w-full h-full object-cover"
              alt="Remote Peer"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
              <div className={`relative p-1.5 rounded-full transition-all duration-500 ${isSpeakingPeer ? 'bg-emerald-500/20' : ''}`}>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/0 animate-[ping_3s_infinite]" style={{ display: isSpeakingPeer ? 'block' : 'none' }} />
                <img src="https://picsum.photos/seed/priyanshu/300/300" className="w-32 h-32 md:w-56 md:h-56 rounded-full shadow-2xl border-4 border-white/10" alt="Peer" />
              </div>
              <div className="text-center">
                <h4 className="text-white text-2xl font-heading font-black">Priyanshu S.</h4>
                <div className="flex items-center justify-center gap-2 mt-2">
                   <div className="flex gap-1 items-center h-4">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1 rounded-full transition-all duration-300 ${isSpeakingPeer ? 'bg-emerald-400 animate-wave' : 'bg-white/10 h-1'}`} 
                          style={{ animationDelay: `${i * 0.1}s`, height: isSpeakingPeer ? '100%' : '4px' }} 
                        />
                      ))}
                    </div>
                </div>
              </div>
            </div>
          )}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg">
            <span className="text-white text-xs font-bold tracking-tight">Priyanshu S.</span>
          </div>
        </div>

        {/* Self Video */}
        <div className={`
          flex-grow w-full max-w-2xl aspect-video md:aspect-square lg:aspect-video rounded-[2.5rem] bg-[#1e293b]/30 backdrop-blur-sm relative overflow-hidden border border-white/5 shadow-2xl transition-all duration-500
        `}>
           {(!isVideoOff && mode === 'video') ? (
             <img 
               src="https://picsum.photos/seed/aryan/1280/720" 
               className="w-full h-full object-cover"
               alt="Self"
             />
           ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
               <div className="p-1 rounded-full bg-white/5">
                 <img src="https://picsum.photos/seed/aryan/300/300" className="w-32 h-32 md:w-56 md:h-56 rounded-full opacity-60 grayscale border-4 border-white/5" alt="You" />
               </div>
               <h4 className="text-white/30 text-2xl font-heading font-black">You</h4>
            </div>
           )}
           <div className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg">
             <span className="text-white text-xs font-bold tracking-tight">You</span>
             {isMuted && <MicOff className="w-3.5 h-3.5 text-red-500" />}
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#111827]/80 backdrop-blur-2xl border border-white/10 px-8 py-5 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40">
        
        <div className="flex items-center gap-4 pr-6 border-r border-white/10">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4.5 rounded-full transition-all group ${isMuted ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
          >
            {isMuted ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7 group-hover:scale-110" />}
          </button>
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4.5 rounded-full transition-all group ${isVideoOff ? 'bg-[#374151] text-white/40 shadow-inner' : 'hover:bg-white/10 text-white/70 hover:text-white'}`}
          >
            {isVideoOff ? <VideoOff className="w-7 h-7" /> : <Video className="w-7 h-7 group-hover:scale-110" />}
          </button>
        </div>

        <div className="flex items-center gap-2 px-2">
           <button className="p-4.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110">
             <Monitor className="w-7 h-7" />
           </button>
           <button className="p-4.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110">
             <Smile className="w-7 h-7" />
           </button>
           <button className="p-4.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-all hover:scale-110">
             <Hand className="w-7 h-7" />
           </button>
        </div>

        <button 
          onClick={handleHangup}
          className="ml-4 p-5 bg-red-600 hover:bg-red-700 text-white rounded-[2rem] px-12 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/30 font-bold uppercase tracking-widest text-sm"
        >
          <PhoneOff className="w-7 h-7" />
        </button>
      </div>

    </div>
  );
}
