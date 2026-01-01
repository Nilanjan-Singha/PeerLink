"use client";

import React, { useState, useEffect } from 'react';
import { 
  X, User, GraduationCap, Briefcase, Link as LinkIcon, 
  Github, Linkedin, Globe, Info, ChevronRight, Save, Twitter
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { TOPICS } from '@/constants';
import { ExpertiseLevel, TopicID, UserProfile } from '@/types';
import { useRouter } from 'next/navigation';

const ProfilePage: React.FC = () => {
  const { profile, setProfile, setIsLoggedIn } = useApp();
  const router = useRouter();
  
  // Local state for editing form
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  // Sync local state if global profile changes (optional safety)
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

  const handleSave = () => {
    setProfile(editedProfile);
    router.back(); 
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
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-750 text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button onClick={() => {setIsLoggedIn(false); router.back()}} className='px-6 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer'> Logout</button>
      </div>
      </div>

      {/* Content */}
      <div className="relative z-10 grow overflow-y-auto p-4 md:p-8 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          
          {/* Section 1: Basic Info */}
          <section className="bg-blue-900 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl ">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold  uppercase tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={editedProfile.name}
                  onChange={e => setEditedProfile({...editedProfile, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Headline</label>
                <input 
                  type="text" 
                  value={editedProfile.headline}
                  onChange={e => setEditedProfile({...editedProfile, headline: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="e.g. Senior Frontend Engineer @ TechCo"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">College / University</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    value={editedProfile.college}
                    onChange={e => setEditedProfile({...editedProfile, college: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                    placeholder="College name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Graduation Year</label>
                <input 
                  type="text" 
                  value={editedProfile.gradYear}
                  onChange={e => setEditedProfile({...editedProfile, gradYear: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="e.g. 2024"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1">Job Role (Optional)</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input 
                    type="text" 
                    value={editedProfile.jobRole}
                    onChange={e => setEditedProfile({...editedProfile, jobRole: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                    placeholder="e.g. Fullstack Developer"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Links */}
          <section className="bg-purple-900 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                <LinkIcon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">Social Links</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  value={editedProfile.links.github}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, github: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="Github URL"
                />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  value={editedProfile.links.linkedin}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, linkedin: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="LinkedIn URL"
                />
              </div>
              <div className="relative">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  value={editedProfile.links.x}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, x: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="X (Twitter) URL"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="text" 
                  value={editedProfile.links.website}
                  onChange={e => setEditedProfile({...editedProfile, links: {...editedProfile.links, website: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-[#c259ee]/50 transition-colors"
                  placeholder="Personal Website"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Expertise */}
          <section className="bg-green-950 border border-white/5 rounded-[2.5rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ChevronRight className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white">Technical Expertise</h3>
              </div>
              
              <div className="group relative">
                <div className="flex items-center gap-2 text-white/30 hover:text-white/60 cursor-help transition-colors">
                  <Info className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">How this works?</span>
                </div>
                <div className="absolute bottom-full right-0 mb-4 w-64 p-4 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                  <p className="text-xs text-white/70 leading-relaxed">
                    Matching algorithms prioritize connecting peers with similar expertise levels to ensure productive discussions.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {TOPICS.map(topic => (
                <div 
                  key={topic.id} 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: topic.color }}>
                      <Globe className="w-5 h-5" /> {/* Generic icon for list */}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{topic.label}</p>
                      <p className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{topic.id}</p>
                    </div>
                  </div>

                  <div className="flex p-1 bg-[#0b1120] rounded-2xl border border-white/5 self-end md:self-auto">
                    {levels.map(level => (
                      <button
                        key={level}
                        onClick={() => handleLevelChange(topic.id, level)}
                        className={`
                          px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all
                          ${editedProfile.expertise[topic.id] === level 
                            ? 'bg-white text-slate-900 shadow-lg' 
                            : 'text-white/30 hover:text-white/60'}
                        `}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
