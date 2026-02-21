"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@/lib/supabase/server";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      // Debug: ensure NEXT_PUBLIC vars were inlined
      // (partial key logged to avoid exposing full secret)
      // eslint-disable-next-line no-console
      console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      // eslint-disable-next-line no-console
      console.log(
        "Supabase anon key present:",
        !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "partial:",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice?.(0, 6)
      );

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // log full error for debugging
        // eslint-disable-next-line no-console
        console.error("Supabase auth error:", error);
        setError(error.message || "Login failed");
        return;
      }

      // eslint-disable-next-line no-console
      console.log("Sign in success:", data);
//  const supabase = await creat eClient();
  const { data: profiles, error: profilesError } = await supabase.from("profiles").select();
     sessionStorage.setItem("nextData", JSON.stringify({ ...data, profiles, profilesError }));
router.push(ROUTES.DASHBOARD);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Unexpected error during sign in:", err);
      setError((err as Error).message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 lg:p-8 bg-[#1B1E19] overflow-hidden selection:bg-[#2E7536]/30">
      {/* Immersive Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#2E7536]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#558953]/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      {/* Main Floating Vault Card */}
      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-12 bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Decorative Watermark */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center select-none">
          <span className="text-[20rem] font-black text-white/[0.01] leading-none transform -rotate-12 translate-y-12">
            FLEET
            FLOW
          </span>
        </div>

        {/* Left Section: Context & Hero (Large Screen Only) */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-16 border-r border-white/5">
          <div className="space-y-12">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2E7536] shadow-lg shadow-[#2E7536]/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <span className="text-white font-black text-xl tracking-tighter">FF</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Fleet<span className="text-[#558953]">Flow</span>
              </span>
            </Link>

            <div className="space-y-6">
              <h1 className="text-6xl font-black text-white leading-[1] tracking-tight">
                Command your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7536] via-[#E4BF1B] to-[#558953]">
                  logistics empire.
                </span>
              </h1>
              <p className="text-xl text-[#C5D5D8]/80 leading-relaxed font-medium max-w-md">
                Elevate your operations with the most advanced fleet management ecosystem ever built.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1B1E19] bg-slate-800 ring-2 ring-white/5" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#1B1E19] bg-white/10 flex items-center justify-center backdrop-blur-md ring-2 ring-white/5">
                <span className="text-[10px] font-bold text-white">+2k</span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <p className="text-sm font-semibold text-slate-400 tracking-wide uppercase">
              Platform trusted by global enterprises
            </p>
          </div>
        </div>

        {/* Right Section: Interactive Login Vault */}
        <div className="lg:col-span-5 flex flex-col justify-center p-8 lg:p-14 bg-white/[0.03]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#2E7536] shadow-xl">
              <span className="text-white font-black text-2xl">FF</span>
            </div>
          </div>

          <div className="w-full max-w-sm mx-auto space-y-10">
            <div className="text-center lg:text-left space-y-3">
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Welcome to FleetFlow
                Login
              </h2>
              <p className="text-[#C5D5D8]/60 font-medium">
                Verify your identity to proceed
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
                  <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-bold text-white/70 ml-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#2E7536] focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" className="block text-sm font-bold text-white/70">
                    Password
                  </label>
                  <Link
                    href={ROUTES.AUTH.REGISTER}
                    className="text-xs font-bold text-[#E4BF1B] hover:text-[#E4BF1B]/80 transition-colors uppercase tracking-widest"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#2E7536] focus:border-transparent transition-all duration-200"
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center ml-1">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#2E7536] focus:ring-[#2E7536] cursor-pointer"
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="ml-3 text-sm text-white/50 font-medium cursor-pointer flex items-center gap-2">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 bg-[#E4BF1B] text-[#1B1E19] font-black rounded-xl shadow-xl shadow-[#E4BF1B]/10 active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#1B1E19]/30 border-t-[#1B1E19] rounded-full animate-spin" />
                      <span className="uppercase tracking-widest text-xs">Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <span className="uppercase tracking-widest text-xs">Sign In to Dashboard</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="text-center pt-4">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Need an account?{" "}
                <Link
                  href={ROUTES.AUTH.REGISTER}
                  className="text-white hover:text-[#E4BF1B] transition-colors underline decoration-[#E4BF1B] decoration-2 underline-offset-4"
                >
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Footer Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">
        <span>Privacy Protocol</span>
        <div className="w-1 h-1 rounded-full bg-white/5" />
        <span>v2.6.0</span>
        <div className="w-1 h-1 rounded-full bg-white/5" />
        <span>&copy; 2026 Fleet Flow</span>
      </div>
    </div>
  );
}
