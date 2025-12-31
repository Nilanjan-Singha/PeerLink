"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TopicID, ConnectionMode, UserProfile, Topic } from '@/types';
import { INITIAL_PROFILE, TOPICS } from '@/constants';
import { useRouter } from 'next/navigation';

interface AppState {
  // State
  profile: UserProfile;
  selectedTopicId: TopicID | null;
  mode: ConnectionMode;
  isSearching: boolean;
  isConnected: boolean;
  isProfileOpen: boolean;
  
  // Computed
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
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [selectedTopicId, setSelectedTopicId] = useState<TopicID | null>(null);
  const [mode, setMode] = useState<ConnectionMode>('voice');
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter(); 

  // Search Simulation Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSearching) {
      timer = setTimeout(() => {
        setIsSearching(false);
        setIsConnected(true);
        router.push('/connect');
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isSearching]);

  // Actions
  const toggleTopic = (id: TopicID) => setSelectedTopicId(prev => prev === id ? null : id);
  
  const startSearch = useCallback(() => {
    if (selectedTopicId) setIsSearching(true);
  }, [selectedTopicId]);

  const cancelSearch = () => setIsSearching(false);
  
  const hangup = () => {
    setIsConnected(false);
    setSelectedTopicId(null);
  };

  const currentTopic = TOPICS.find(t => t.id === selectedTopicId);

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      selectedTopicId, toggleTopic,
      mode, setMode,
      isSearching, startSearch, cancelSearch,
      isConnected, hangup,
      isProfileOpen, openProfile: () => setIsProfileOpen(true), closeProfile: () => setIsProfileOpen(false),
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
