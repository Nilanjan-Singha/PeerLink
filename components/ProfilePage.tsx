"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, User, GraduationCap, Briefcase, Link as LinkIcon, 
  Github, Linkedin, Globe, Info, ChevronRight, Save, Twitter, Zap, Shield, Crown
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TOPICS, getIcon } from '@/constants';
import { ExpertiseLevel, TopicID, UserProfile } from '@/types';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ProfilePage: React.FC = () => {
  const { profile, setProfile } = useApp();
  const router = useRouter();
  const { logout, updateProfile } = useAuth();
  
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  const levels: ExpertiseLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  const handleLevelChange = (topicId: TopicID, level: ExpertiseLevel) => {
    setEditedProfile(prev => ({
      ...prev,
      expertise: {
        ...prev.expertise,
        [topicId]: level
      }
    }));
  };

const handleSave = async () => {
    setProfile(editedProfile);

    const { error } = await updateProfile(editedProfile);

    if (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save changes."); 
    } else {
      router.back();
    }
  };


  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'Beginner': return { icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-400/10' };
      case 'Intermediate': return { icon: Shield, color: 'text-indigo-400', bg: 'bg-indigo-400/10' };
      case 'Advanced': return { icon: Crown, color: 'text-amber-400', bg: 'bg-amber-400/10' };
      default: return { icon: Zap, color: 'text-slate-400', bg: 'bg-slate-800' };
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-[#0b0b0b] flex flex-col overflow-hidden animate-in fade-in duration-300">

      {/* Header */}
      <div className="relative z-10 px-6 py-4 border-b border-white/5 bg-[#0b0b0b] backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer">
            <X className="w-6 h-6 text-white/50" />
          </button>
          <h2 className="font-heading font-black text-xl text-white">Edit Profile</h2>
        </div>
        <div className="flex items-center gap-2">
            <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-emerald-900/20"
            >
            <Save className="w-4 h-4" />
            Save Changes
            </button>
            <button onClick={logout} className='px-6 py-2.5 rounded-xl font-bold text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer'> Logout</button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 grow overflow-y-auto p-4 md:p-8 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          
          {/* Section 1: Basic Info */}
          <section className="bg-[#1e1e24] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={editedProfile.name}
                  onChange={e => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-white/20"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Headline</label>
                <input 
                  type="text" 
                  value={editedProfile.headline}
                  onChange={e => setEditedProfile({...editedProfile, headline: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-white/20"
                  placeholder="e.g. Senior Frontend Engineer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">College / University</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    value={editedProfile.college}
                    onChange={e => setEditedProfile({...editedProfile, college: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-white/20"
                    placeholder="College name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Graduation Year</label>
                <input 
                  type="text" 
                  value={editedProfile.gradYear}
                  onChange={e => setEditedProfile({...editedProfile, gradYear: e.target.value})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-white/20"
                  placeholder="e.g. 2024"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Job Role (Optional)</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    value={editedProfile.jobRole}
                    onChange={e => setEditedProfile({...editedProfile, jobRole: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 transition-colors placeholder:text-white/20"
                    placeholder="e.g. Fullstack Developer"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Links */}
          <section className="bg-[#1e1e24] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Social Links</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="relative group">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  value={editedProfile.links.github}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, github: e.target.value}})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
                  placeholder="Github URL"
                />
              </div>
              <div className="relative group">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  value={editedProfile.links.linkedin}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, linkedin: e.target.value}})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="relative group">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  value={editedProfile.links.x}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, x: e.target.value}})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
                  placeholder="X (Twitter) URL"
                />
              </div>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-purple-400 transition-colors" />
                <input 
                  type="text" 
                  value={editedProfile.links.website}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, website: e.target.value}})}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
                  placeholder="Personal Website"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Technical Expertise (NEW DESIGN) */}
          <section className="bg-[#1e1e24] border border-white/5 rounded-[2.5rem] p-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

             {/* Header */}
             <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ChevronRight className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-white">Technical Expertise</h3>
                </div>
                
                <div className="group relative">
                    <div className="flex items-center gap-2 text-white/30 hover:text-white/60 cursor-help transition-colors">
                        <Info className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">How this works?</span>
                    </div>
                    <div className="absolute top-0 right-0 mt-8 w-64  p-4 bg-[#0b1120] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                        <p className="text-xs text-white/70 leading-relaxed">
                        We match you with peers of similar skill levels. Keep these updated as you learn!
                        </p>
                    </div>
                </div>
             </div>

             {/* Grid Layout */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {TOPICS.map(topic => {
                    const currentLevel = editedProfile.expertise[topic.id] || 'Beginner';
                    
                    return (
                        <div 
                        key={topic.id} 
                        className="group relative p-5 rounded-3xl bg-black/20 border border-white/5 hover:border-white/10 transition-all hover:bg-black/40"
                        >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                {/* Icon Container */}
                                <div 
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" 
                                    style={{ backgroundColor: topic.color }}
                                >
                                    {getIcon ? getIcon(topic.icon, "w-5 h-5") : <Zap className="w-5 h-5" />} 
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{topic.label}</p>
                                    <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0">
                                        {topic.id}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Active Level Badge (Visual Summary) */}
                            <div className={`px-2 py-1 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-wider ${getLevelConfig(currentLevel).color} ${getLevelConfig(currentLevel).bg}`}>
                                {currentLevel}
                            </div>
                        </div>

                        {/* Interactive Level Selectors */}
                        <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-2xl border border-white/5">
                            {levels.map(level => {
                                const isActive = currentLevel === level;
                                const config = getLevelConfig(level);
                                const Icon = config.icon;

                                return (
                                    <button
                                    key={level}
                                    onClick={() => handleLevelChange(topic.id, level)}
                                    className={`
                                        relative flex items-center justify-center h-9 rounded-xl transition-all duration-300 group/btn
                                        ${isActive 
                                        ? 'bg-white shadow-lg scale-100' 
                                        : 'hover:bg-white/5 text-white/20 hover:text-white/50 scale-95 hover:scale-100'}
                                    `}
                                    >
                                    {/* Icon */}
                                    <Icon className={`w-4 h-4 transition-colors ${isActive ? config.color : 'currentColor'}`} />
                                    
                                    {/* Hover Label Tooltip */}
                                    <span className={`
                                        absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1e293b] text-white text-[10px] font-bold rounded-md shadow-xl border border-white/10
                                        opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all whitespace-nowrap z-10 pointer-events-none
                                    `}>
                                        {level}
                                    </span>
                                    </button>
                                );
                            })}
                        </div>
                        </div>
                    );
                })}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
