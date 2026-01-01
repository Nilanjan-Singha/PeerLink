"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TopicID, ConnectionMode, UserProfile, Topic } from '@/types';
import { INITIAL_PROFILE, TOPICS } from '@/constants';
import { useRouter } from 'next/navigation';

interface AppState {
  // Data
  profile: UserProfile;
  currentTopic: Topic | undefined;
  
  // State Flags
  selectedTopicId: TopicID | null;
  mode: ConnectionMode;
  isSearching: boolean;
  isConnected: boolean;
  isProfileOpen: boolean;
  isLoggedIn: boolean; // Only keep this one for auth status
  isOnboardingComplete: boolean;

  // Actions
  setProfile: (p: UserProfile) => void;
  toggleTopic: (id: TopicID) => void;
  setMode: (m: ConnectionMode) => void;
  startSearch: () => void;
  cancelSearch: () => void;
  hangup: () => void;
  setIsLoggedIn: (status: boolean) => void;
  login: () => void; // Simple action to set status to true
  logout: () => void;
  setIsOnboardingComplete: (status: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [selectedTopicId, setSelectedTopicId] = useState<TopicID | null>(null);
  const [mode, setMode] = useState<ConnectionMode>('voice');
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);


  const router = useRouter(); 

  // Search Simulation Logic
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

  // Actions
  const toggleTopic = (id: TopicID) => setSelectedTopicId(prev => prev === id ? null : id);
  const startSearch = useCallback(() => {
    // check user is logged in or not
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    if (selectedTopicId) setIsSearching(true); }, [selectedTopicId, isLoggedIn]);
  const cancelSearch = () => setIsSearching(false);
  const hangup = () => { setIsConnected(false); setSelectedTopicId(null); };
  
  // Auth Helpers
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const currentTopic = TOPICS.find(t => t.id === selectedTopicId);

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      selectedTopicId, toggleTopic,
      mode, setMode,
      isSearching, startSearch, cancelSearch,
      isConnected, hangup,
      isProfileOpen, 
      isLoggedIn, login, logout,setIsLoggedIn,
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
