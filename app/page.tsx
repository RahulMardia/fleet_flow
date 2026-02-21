"use client";

import { ROUTES } from "@/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.AUTH.LOGIN);
  }, [router]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#1B1E19] overflow-hidden selection:bg-[#2E7536]/30">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#2E7536]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#558953]/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-[#2E7536] shadow-xl">
            <span className="text-white font-black text-4xl">FF</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight">
            Fleet<span className="text-[#E4BF1B]">Flow</span>
          </h1>
          <p className="text-xl text-[#C5D5D8]/70 leading-relaxed">
            Enterprise Fleet Management System
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          {[
            { icon: "🚗", label: "Real-Time Tracking" },
            { icon: "📊", label: "Advanced Analytics" },
            { icon: "👥", label: "Team Management" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="p-4 rounded-xl bg-white/[0.05] border border-white/10"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm font-semibold text-white/80">{feature.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-4">
          <p className="text-[#C5D5D8]/60 font-medium mb-6">
            Sign in to manage your fleet operations
          </p>
        </div>
      </div>
    </div>
  );
}