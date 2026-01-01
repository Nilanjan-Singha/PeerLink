"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight, Fingerprint, Github, Chrome, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, loginWithProvider, isLoggedIn } = useAuth();
  const { setProfile, profile } = useApp();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");



    if (isLoggedIn) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signInWithEmail(email, password);
    if (error) {
      console.error("Login failed:", error);
      setErrorMsg("Login failed. Please check your credentials.");
      setLoading(false);
      return;
    }
    setLoading(false);

  };

  return (

    <div className="fixed inset-0 z-20 bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-125">
        <button
          onClick={() => router.push('/')}
          className="absolute -top-12 right-0 p-2 text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-zinc-150 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">Login</h2>
              <Fingerprint className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-sm text-zinc-500">Enter your credentials to access the lobby.</p>
          </div>

          <div className="p-6 pt-6">
            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 mb-6 bg-zinc-900 rounded-lg border border-zinc-800/50">
              <div className="text-center text-sm font-medium py-1.5 rounded-md bg-zinc-800 text-zinc-100 shadow-sm transition-all cursor-default">
                Login
              </div>
              <Link
                href="/signup"
                className="text-center text-sm font-medium py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 transition-all"
              >
                Register
              </Link>
            </div>

             {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                {errorMsg}
              </div>
            )}


            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Email</label>
                <input
                  required type="email" placeholder="name@example.com"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none text-zinc-300">Password</label>
                  <button type="button" className="text-xs text-zinc-500 hover:text-zinc-300 underline-offset-4 hover:underline">
                    Forgot password?
                  </button>
                </div>
                <input
                  required type="password" placeholder="••••••••"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200 h-10 w-full mt-2 transition-colors disabled:opacity-50"
              >
                {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" /> : (
                  <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => loginWithProvider("github")} className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 h-10 text-white">
                <Github className="mr-2 h-4 w-4" /> Github
              </button>
              <button onClick={() => loginWithProvider("google")} className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 h-10 text-white">
                <Chrome className="mr-2 h-4 w-4" /> Google
              </button>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/50 border-t border-zinc-800 text-center">
            <p className="text-xs text-zinc-500">
              By clicking continue, you agree to our <button className="underline hover:text-zinc-300">Terms</button> and <button className="underline hover:text-zinc-300">Privacy Policy</button>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}