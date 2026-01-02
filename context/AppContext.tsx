"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { TopicID, ConnectionMode, UserProfile, Topic } from '@/types';
import { INITIAL_PROFILE, TOPICS } from '@/constants';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext'; 
import { toast } from 'sonner';

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
  setProfile: (p: UserProfile | ((prev: UserProfile) => UserProfile)) => void; // Update type to allow updater function
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
  const { user, dbProfile, isLoading:  isAuthLoading, isLoggedIn } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [selectedTopicId, setSelectedTopicId] = useState<TopicID | null>(null);
  const [mode, setMode] = useState<ConnectionMode>('voice');
  const [isSearching, setIsSearching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const router = useRouter(); 

  // sync profile with auth and dbProfile
  useEffect(() => {
    if (dbProfile) {
      setProfile(dbProfile);
    } 
    else if (user && !isAuthLoading) {
      setProfile(prev => ({
        ...prev,
        name: user.user_metadata.full_name || user.email?.split('@')[0] || "User",
        avatar: user.user_metadata.avatar_url || prev.avatar,
      }));
    } 
    else if (!user && !isAuthLoading) {
      setProfile(INITIAL_PROFILE);
    }
  }, [user, dbProfile, isAuthLoading]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isSearching) {
      if (!selectedTopicId) {
        setIsSearching(false);
        return;
      }

      timer = setTimeout(() => {
        setIsSearching(false);
        const userName = profile.name || "Guest";
        router.push(`/connect?topic=${selectedTopicId}&username=${encodeURIComponent(userName)}`);
      }, 5000);
    }
    
    return () => clearTimeout(timer);
  }, [isSearching, selectedTopicId, profile.name, router]);

  // actions
  
  const toggleTopic = useCallback((id: TopicID) => {
    setSelectedTopicId(prev => prev === id ? null : id);
  }, []);

 const startSearch = useCallback(() => { 
    if (!isLoggedIn) {
      toast.error("Please login to start matching!");
      return;
    }
    if (!selectedTopicId) {
      toast.error("Please select a topic first.");
      return;
    }
    setIsSearching(true); 
  }, [selectedTopicId, isLoggedIn]);

  const cancelSearch = useCallback(() => setIsSearching(false), []);
  
  const hangup = useCallback(() => { 
    setIsConnected(false); 
    setSelectedTopicId(null); 
  }, []);

  const openProfile = useCallback(() => setIsProfileOpen(true), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);

  const currentTopic = useMemo(() => 
    TOPICS.find(t => t.id === selectedTopicId), 
  [selectedTopicId]);

  return (
    <AppContext.Provider value={{
      profile, setProfile,
      selectedTopicId, toggleTopic,
      mode, setMode,
      isSearching, startSearch, cancelSearch,
      isConnected, hangup,
      isProfileOpen, openProfile, closeProfile,
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
