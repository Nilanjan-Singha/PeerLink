"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, AuthError, Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { UserProfile } from "@/types"; 


interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  dbProfile: UserProfile | null; 

  // Actions
  loginWithProvider: (provider: "github" | "google") => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: AuthError | null }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<void>;
  updateProfile: (updatedProfile: UserProfile) => Promise<{ error: any }>;

}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // FIX 1: Wrap supabase client in useState to ensure it stays stable across renders
  // This prevents the useEffect from entering an infinite loop.
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
    const [dbProfile, setDbProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);


    // DB functions
  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      setDbProfile({
        name: data.full_name || "",
        avatar: data.avatar_url || "",
        headline: data.headline || "",
        college: data.college || "",
        gradYear: data.grad_year || "",
        jobRole: data.job_role || "",
        expertise: data.expertise || {},
        links: {
          github: data.github_url || "",
          linkedin: data.linkedin_url || "",
          x: data.twitter_url || "",
          website: data.website_url || ""
        }
      });
    }
  };



  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Session check failed", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      // Optional: Refresh router on auth state change to update Server Components
      if (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, router]);

  // --- ACTIONS ---

    const updateProfile = async (updatedProfile: UserProfile) => {
    if (!user) return { error: "No user logged in" };

    // Update Supabase DB
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: updatedProfile.name,
        headline: updatedProfile.headline,
        college: updatedProfile.college,
        grad_year: updatedProfile.gradYear,
        job_role: updatedProfile.jobRole,
        expertise: updatedProfile.expertise,
        github_url: updatedProfile.links.github,
        linkedin_url: updatedProfile.links.linkedin,
        twitter_url: updatedProfile.links.x,
        website_url: updatedProfile.links.website,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (!error) {
      // Update local state immediately for UI responsiveness
      setDbProfile(updatedProfile);
    }

    return { error };
  };


  const loginWithProvider = async (provider: "github" | "google") => {
    // FIX 2: Ensure we are in the browser before accessing window
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback?next=/?show_onboard=true`,
      },
    });
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${origin}/auth/callback?next=/?show_onboard=true`,
      },
    });
    return { error };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    // Note: The onAuthStateChange listener will handle the state update
    // We just handle the redirect here if successful
    if (!error) {
      router.replace("/?show_onboard=true");
    }
    return { error };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        dbProfile,
        updateProfile,
        loginWithProvider,
        signUpWithEmail,
        signInWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
