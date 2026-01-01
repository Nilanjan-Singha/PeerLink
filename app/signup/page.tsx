"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, ArrowRight, Fingerprint, Github, Chrome } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signUpWithEmail, loginWithProvider } = useAuth();
  const { setProfile, profile } = useApp();
  const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await signUpWithEmail(email, password, fullName);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setLoading(false);
      router.push('/'); 
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/10 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
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
          <div className="p-6 pb-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">Create an account</h2>
              <Fingerprint className="w-5 h-5 text-zinc-500" />
            </div>
            <p className="text-sm text-zinc-500">Enter your information to get started.</p>
          </div>

          <div className="p-6 pt-6">
            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 p-1 mb-6 bg-zinc-900 rounded-lg border border-zinc-800/50">
              <Link 
                href="/login"
                className="text-center text-sm font-medium py-1.5 rounded-md text-zinc-500 hover:text-zinc-300 transition-all"
              >
                Login
              </Link>
              <div className="text-center text-sm font-medium py-1.5 rounded-md bg-zinc-800 text-zinc-100 shadow-sm transition-all cursor-default">
                Register
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Full Name</label>
                <input 
                  required type="text" placeholder="Aryan Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Email</label>
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required type="email" placeholder="name@example.com"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-zinc-300">Password</label>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required type="password" placeholder="••••••••"
                  className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:outline-none transition-all"
                />
              </div>

              <button 
                type="submit" disabled={loading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200 h-10 w-full mt-2 transition-colors disabled:opacity-50"
              >
                {loading ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" /> : (
                  <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-950 px-2 text-zinc-500">Or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={()=>{loginWithProvider('github')}} className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 h-10 text-white">
                <Github  className="mr-2 h-4 w-4" /> Github
              </button>
              <button onClick={()=>{loginWithProvider('google')}} className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 h-10 text-white">
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
