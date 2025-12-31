"use client";

import React from 'react';
import { Flame, LogIn } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation'; // Import router here

const Header: React.FC = () => {
  const { profile, openProfile, isLoggedIn } = useApp(); // Destructure what we actually need
  const router = useRouter();

  return (
    <header className="px-4 md:px-12 py-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => router.push('/')}>
        <div className="w-2.5 h-2.5 rounded-full bg-[#f472b6]" />
        <span className="font-heading font-black text-2xl tracking-tight text-white">
          PeerLink
        </span>
      </div>

      {/* Online Count Pill */}
      <div className="hidden sm:flex items-center gap-2 bg-[#1e293b]/50 border border-[#334155]/50 px-5 py-2 rounded-full backdrop-blur-sm">
        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
        <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider">
          1,420 Engineers Online <span className="text-white/40 ml-1">IN</span>
        </span>
      </div>

      {/* Profile area */}
      <div className="flex items-center gap-4">
        {!isLoggedIn && (
          <button 
            onClick={() => router.push('/login')} // Direct routing
            className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2.5 rounded-full text-white font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5 text-purple-400" />
            Login
          </button>
        )}

        { isLoggedIn && (
        <div 
          onClick={openProfile}
          className="flex items-center gap-4 bg-[#1e293b]/40 border border-[#334155]/40 p-1.5 pr-3 rounded-full cursor-pointer hover:bg-white/10 transition-colors"
        >
          {/* {isLoggedIn && (
            <div className="flex items-center gap-2 bg-[#0f172a] px-3 py-1.5 rounded-full border border-white/5 shadow-inner">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <div className="flex flex-col -space-y-1">
                <span className="text-[10px] font-bold text-orange-500/80 uppercase">12</span>
                <span className="text-[10px] font-bold text-white uppercase">Days</span>
              </div>
            </div>
          )} */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 relative group">
            <img 
              src={isLoggedIn ? profile.avatar : "https://ui-avatars.com/api/?name=Guest&background=1e293b&color=fff"} 
              alt="avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        )}
      </div>
    </header>
  );
};

export default Header;
