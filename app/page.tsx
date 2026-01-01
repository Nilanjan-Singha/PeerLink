"use client";

import React from 'react';
import { useApp } from '@/context/AppContext';
import { TOPICS } from '@/constants';
import Header from '@/components/Header';
import TopicCard from '@/components/TopicCard';
import ActionBar from '@/components/ActionBar';
import MatchingOverlay from '@/components/MatchingOverlay';
// import CallOverlay from '@/components/CallOverlay';
import ProfilePage from '@/components/ProfilePage';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

function HomeContent() {
  const { 
    profile, 
    selectedTopicId, 
    toggleTopic, 
    isSearching, 
    isConnected, 
    currentTopic,
  } = useApp();

  const { isLoggedIn, isLoading } = useAuth();

  const router = useRouter();
  const searchParams = useSearchParams();
  
React.useEffect(() => {
    const showOnboard = searchParams.get('show_onboard');
    if (!isLoading && isLoggedIn && showOnboard === 'true') {
       router.push('/onboard');
    }
  }, [searchParams, isLoggedIn, isLoading, router]);


  const getColSpan = (id: string) => {
    if (id === 'dsa' || id === 'web-dev' || id === 'chill') {
      return 'md:col-span-2';
    }
    return 'md:col-span-1';
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTopicId) return;
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    toggleTopic(selectedTopicId);
  };

  return (
    <div className="min-h-screen w-full bg-black/80  relative text-white/80" onClick={handleBackgroundClick}>
      {/* Circuit Board - Light Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
            radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
            radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Top Navigation */}
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        
        <main className="grow container mx-auto px-4 md:px-12 py-8 max-w-7xl">
          {/* 2. Hero Section */}
          {isLoggedIn ? (
            <div className="text-center mb-12">
              <h1 className="font-heading font-black text-4xl md:text-6xl  mb-4">
                Namaste, {profile.name.split(' ')[0]}!
              </h1>
              <h2 className="font-heading font-bold text-2xl md:text-3xl ">
                What are we discussing today?
              </h2>
            </div>
          ) : (
            <div className="text-center mb-12">
              <h1 className="font-heading font-black text-4xl md:text-7xl mb-4">
                Namaste, Bhai!
              </h1>
              <h2 className="font-heading font-bold text-2xl md:text-3xl ">
                Please login or sign up to continue.
              </h2>
            </div>
          )}

          {/* 3. Action Control (Voice/Video toggles & Start Button) */}
          <ActionBar />

          {/* 4. Topic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {TOPICS.map((topic) => (
              <div key={topic.id} className={getColSpan(topic.id)}>
                <TopicCard
                  topic={topic}
                  // We don't pass 'isSelected' or 'onClick' anymore; 
                  // TopicCard handles that via context + topic.id
                />
              </div>
            ))}
          </div>

          {/* 5. Community Stats Footer (Visible when idle) */}
          {!isSearching && !isConnected && (
            <div className="mt-24 mb-12 p-8 md:p-12 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-10 backdrop-blur-md">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex -space-x-5">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="w-16 h-16 rounded-full border-4 border-gray-200 overflow-hidden bg-slate-800 shadow-2xl transition-transform hover:-translate-y-1">
                      <img src={`https://picsum.photos/seed/${i + 60}/100/100`} alt="engineer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-16 h-16 rounded-full border-4 border-gray-200 bg-gray-900 flex items-center justify-center text-white text-sm font-bold shadow-2xl">
                    +1.2k
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <p className="font-heading font-black text-2xl text-gray-900">Join the Community</p>
                  <p className="text-base text-gray-600 font-medium">Over 4,200 peer sessions active right now</p>
                </div>
              </div>
              
              <div className="flex items-center gap-10 md:gap-16">
                <div className="text-center">
                  <p className="text-4xl font-black text-[#c259ee] mb-1">1.2s</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Avg Match</p>
                </div>
                <div className="w-px h-16 bg-gray-200/30 hidden lg:block" />
                <div className="text-center">
                  <p className="text-4xl font-black text-[#17bfec] mb-1">98%</p>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Completion</p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 6. Overlays (Conditional Rendering) */}
        <div onClick={(e) => e.stopPropagation()}>
          {isSearching && (
            <MatchingOverlay />
          )}

          {/* {isConnected && currentTopic && (
            <CallOverlay />
          )} */}

        </div>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black/80" />}>
      <HomeContent />
    </Suspense>
  );
}
