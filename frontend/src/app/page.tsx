"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import DemoBanner from "@/components/DemoBanner";
import { apiGet } from "@/lib/api";
import { demoInspectionStats, demoAlerts } from "@/lib/demo-data";

const quickActions = [
  { href: "/inspection", icon: "\u{1F50D}", label: "Run Inspection", desc: "AI visual bearing inspection", color: "border-purple-500/30 hover:border-purple-500" },
  { href: "/quotation", icon: "\u{1F4B0}", label: "Create Quote", desc: "AI-assisted quotation", color: "border-blue-500/30 hover:border-blue-500" },
  { href: "/failure-analysis", icon: "\u{1F527}", label: "Analyze Failure", desc: "AI failure mode analysis", color: "border-red-500/30 hover:border-red-500" },
  { href: "/maintenance", icon: "⚙️", label: "Check Machines", desc: "Predictive maintenance", color: "border-yellow-500/30 hover:border-yellow-500" },
  { href: "/sourcing", icon: "\u{1F4E6}", label: "Sourcing Intel", desc: "Demand & supplier scoring", color: "border-cyan-500/30 hover:border-cyan-500" },
];

const recentActivity = [
  { time: "2 min ago", text: "Bearing #BR-04872 flagged — surface pitting detected (94.2%)", type: "red" },
  { time: "12 min ago", text: "Quote QT-0892 generated for ABC Bearings — ₹2,50,750", type: "blue" },
  { time: "28 min ago", text: "Grinding #3 alert — spindle failure predicted in 72h", type: "yellow" },
  { time: "1 hr ago", text: "Failure analysis FA-0147 — fatigue spalling, XYZ Motors", type: "red" },
  { time: "2 hr ago", text: "Batch BR-B47: 236 inspected, 228 passed, 8 defects", type: "green" },
  { time: "3 hr ago", text: "Supplier A scored 92% — recommended for Q4 procurement", type: "green" },
];

const typeColors: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
};

export default function Dashboard() {
  const [demo, setDemo] = useState(true);
  const [stats, setStats] = useState(demoInspectionStats);
  const [alerts, setAlerts] = useState(demoAlerts);

  useEffect(() => {
    async function load() {
      const [s, a] = await Promise.all([
        apiGet<typeof demoInspectionStats>("/api/inspect/stats"),
        apiGet<typeof demoAlerts>("/api/maintenance/alerts"),
      ]);
      if (!s.demo && s.data) { setStats(s.data); setDemo(false); }
      if (!a.demo && a.data) setAlerts(a.data);
    }
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <DemoBanner show={demo} />

      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">
          AI Bearing Manufacturing Platform
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          BearingAI — Real-time intelligence across sourcing, production, sales & after-sales
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon="\u{1F50D}" value={stats.total_inspected.toLocaleString()} label="Total Inspected" color="purple" />
        <StatCard icon="⚠️" value={`${stats.defect_rate_pct}%`} label="Defect Rate" color="red" />
        <StatCard icon="\u{1F514}" value={alerts.length} label="Active Alerts" color="yellow" />
        <StatCard icon="⏱️" value={`${(stats.avg_scan_time_ms / 1000).toFixed(1)}s`} label="Avg Scan Time" color="green" />
      </div>

      {/* Quick Actions */}
      <h2 className="mb-3 mt-8 text-lg font-bold text-slate-300">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {quickActions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`rounded-xl border bg-slate-900 p-4 transition-all ${a.color}`}
          >
            <span className="text-2xl">{a.icon}</span>
            <p className="mt-2 text-sm font-bold text-white">{a.label}</p>
            <p className="text-xs text-slate-500">{a.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <h2 className="mb-3 mt-8 text-lg font-bold text-slate-300">Recent Activity</h2>
      <div className="rounded-xl border border-slate-700 bg-slate-900">
        {recentActivity.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 px-4 py-3 ${i < recentActivity.length - 1 ? "border-b border-slate-800" : ""}`}
          >
            <div className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${typeColors[a.type]}`} />
            <div className="flex-1">
              <p className="text-sm text-slate-300">{a.text}</p>
            </div>
            <span className="flex-shrink-0 text-xs text-slate-600">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
