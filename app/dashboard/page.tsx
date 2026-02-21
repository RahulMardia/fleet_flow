"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogoutButton } from "@/lib/LogoutButton";
import { ROUTES, NAV_ITEMS } from "@/lib/routes";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const response = await fetch("/api/supabase-test");
        if (!response.ok) {
          throw new Error(`Connection test failed: ${response.status}`);
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection failed");
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();

    // Fetch profiles via server API and compare to current user
    const fetchProfilesAndUser = async () => {
      try {
        // get client user
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr) {
          console.warn("Could not get client user:", userErr.message);
        }

        const userId = userData?.user?.id;
        if (!userId) return;

        const resp = await fetch("/api/profiles");
        if (!resp.ok) {
          console.warn("Failed to fetch profiles", resp.status);
          return;
        }

        const json = await resp.json();
        if (!json.success) {
          console.warn("Profiles API returned error", json.error);
          return;
        }

        const profiles = json.profiles || [];
        const match = profiles.find((p: any) => p.id === userId);
        if (match) setUserRole(match.role ?? null);
      } catch (err) {
        console.error("Error fetching profiles/user:", err);
      }
    };

    fetchProfilesAndUser();

  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#1B1E19] text-white p-6 sticky top-0 h-screen overflow-y-auto">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2 mb-8 hover:opacity-80 transition">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#2E7536]">
            <span className="font-black text-xl">FF</span>
          </div>
          <div>
            <h2 className="text-lg font-black">Fleet</h2>
            <p className="text-xs text-[#2E7536]">Management</p>
          </div>
        </Link>

        <nav className="space-y-2 mb-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-3 rounded-lg transition ${
                pathname === item.href
                  ? "bg-[#2E7536] text-white"
                  : "hover:bg-white/10 text-white/70"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* <span className="text-lg">{item.icon || "📋"}</span> */}
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-6">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to Fleet Flow{userRole ? ` — ${userRole}` : ""}</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Vehicles", value: "0", icon: "🚗" },
            { label: "Active Trips", value: "0", icon: "🛣️" },
            { label: "Drivers", value: "0", icon: "👥" },
            { label: "Revenue", value: "$0", icon: "💰" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                  <p className="text-3xl font-black text-gray-900 mt-2">{card.value}</p>
                </div>
                <span className="text-4xl">{card.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Connection Status */}
        {isLoading ? (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-blue-900 font-semibold">🔄 Testing Supabase connection...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-900 font-semibold mb-2">⚠️ Connection Error</p>
            <p className="text-red-700 text-sm mb-4">{error}</p>
            <p className="text-red-600 text-xs">
              Make sure your Supabase credentials are correct in <code className="bg-red-100 px-2 py-1 rounded">.env.local</code>
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-900 font-semibold">✅ Supabase connection successful!</p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Add Vehicle", path: ROUTES.VEHICLES },
              { label: "Add Driver", path: ROUTES.DRIVERS },
              { label: "New Trip", path: ROUTES.TRIPS },
              { label: "Analytics", path: ROUTES.ANALYTICS },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.path}
                className="p-4 bg-[#2E7536]/10 border border-[#2E7536]/20 rounded-lg hover:bg-[#2E7536]/20 transition text-center font-semibold text-gray-900"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

