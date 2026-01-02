"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TopicID, ConnectionMode, UserProfile, Topic } from '@/types';
import { INITIAL_PROFILE, TOPICS } from '@/constants';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; 


interface AppState {
  profile: UserProfile;
  selectedTopicId: TopicID | null;
  mode: ConnectionMode;
  isSearching: boolean;
  isConnected: boolean;
  isProfileOpen: boolean;
  isOnboardingComplete: boolean;
  
  currentTopic: Topic | undefined;
  
  // Actions
  setProfile: (p: UserProfile) => void;
  toggleTopic: (id: TopicID) => void;
  setMode: (m: ConnectionMode) => void;
  startSearch: () => void;
  cancelSearch: () => void;
  hangup: () => void;
  openProfile: () => void;
  closeProfile: () => void;
  setIsOnboardingComplete: (complete: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, dbProfile } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [selectedTopicId, setSelectedTopicId] = useState<TopicID | null>(null);
  const [mode, setMode] = useState<ConnectionMode>('voice');
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const router = useRouter(); 

  // Sync Auth User to App Profile
  useEffect(() => {
    if (user && dbProfile) {
      setProfile(dbProfile);
    } else if (user) {
      setProfile(prev => ({
        ...prev,
        name: dbProfile?.name || user.user_metadata.full_name || user.email?.split('@')[0] || "User",
        avatar: dbProfile?.avatar || user.user_metadata.avatar_url || prev.avatar,
      }));
    } else {
      setProfile(INITIAL_PROFILE);
    }
  }, [user, dbProfile]);

  // ... (Keep your Search Simulation Logic) ...
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSearching) {
      timer = setTimeout(() => {
        if (selectedTopicId) {
            setIsSearching(false);
            const userName = profile.name || "Guest";
            router.push(`/connect?topic=${selectedTopicId}&username=${encodeURIComponent(userName)}`);
        } else {
            setIsSearching(false);
        }
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSearching, profile, selectedTopicId, router]);

  const toggleTopic = (id: TopicID) => setSelectedTopicId(prev => prev === id ? null : id);
  const startSearch = useCallback(() => { if (selectedTopicId) setIsSearching(true); }, [selectedTopicId]);
  const cancelSearch = () => setIsSearching(false);
  const hangup = () => { setIsConnected(false); setSelectedTopicId(null); };

  const currentTopic = TOPICS.find(t => t.id === selectedTopicId);

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      selectedTopicId, toggleTopic,
      mode, setMode,
      isSearching, startSearch, cancelSearch,
      isConnected, hangup,
      isProfileOpen, openProfile: () => setIsProfileOpen(true), closeProfile: () => setIsProfileOpen(false),
      isOnboardingComplete, setIsOnboardingComplete,
      currentTopic
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
