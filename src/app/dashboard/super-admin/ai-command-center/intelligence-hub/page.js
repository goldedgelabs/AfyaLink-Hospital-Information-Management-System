"use client";

import { useState, useEffect } from "react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";
import { Brain, Activity, Hospital, Users, Thermometer, TrendingUp } from "lucide-react";

const sampleMetrics = [
  { day: "Mon", patients: 200, satisfaction: 90 },
  { day: "Tue", patients: 260, satisfaction: 86 },
  { day: "Wed", patients: 230, satisfaction: 88 },
  { day: "Thu", patients: 300, satisfaction: 85 },
  { day: "Fri", patients: 280, satisfaction: 89 },
  { day: "Sat", patients: 310, satisfaction: 92 },
  { day: "Sun", patients: 190, satisfaction: 87 },
];

export default function IntelligenceHub() {
  const [aiSummary, setAiSummary] = useState("Analyzing metrics...");
  const [trend, setTrend] = useState("Stable");
  const [loading, setLoading] = useState(true);
  const [refreshTime, setRefreshTime] = useState(0);

  useEffect(() => {
    generateAIInsight();
    const interval = setInterval(() => {
      generateAIInsight();
    }, 10000); // auto refresh every 10s
    return () => clearInterval(interval);
  }, []);

  async function generateAIInsight() {
    setLoading(true);
    setRefreshTime(Date.now());
    try {
      const prompt = "Analyze weekly hospital performance metrics and predict the next trend.";
      const res = await fetch("/api/neuroedge", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAiSummary(data.reply || "NeuroEdge: Stable operations with minor growth projected.");
      setTrend(["Stable", "Rising", "Critical"][Math.floor(Math.random() * 3)]);
    } catch {
      setAiSummary("NeuroEdge offline – simulation mode active.");
      setTrend("Stable");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-50">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <SuperAdminNavbar />

        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">NeuroEdge Intelligence Hub</h1>
              <p className="text-gray-600 text-sm mt-1">
                Real-time AI insight center for AfyaLink Infinity Operations
              </p>
            </div>
            <button
              onClick={generateAIInsight}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              {loading ? "Analyzing..." : "Reanalyze"}
            </button>
          </div>

          {/* KPI cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard icon={<Users />} label="Active Patients" value="14,532" delta="+5%" color="emerald" />
            <MetricCard icon={<Hospital />} label="Hospitals Linked" value="87" delta="+3%" color="blue" />
            <MetricCard icon={<Activity />} label="System Uptime" value="99.98%" delta="+0.02%" color="purple" />
            <MetricCard icon={<Brain />} label="AI Health Index" value="97%" delta="+1.4%" color="pink" />
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-lg shadow rounded-2xl p-4"
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Weekly Patient Flow</h2>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={sampleMetrics}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="patients" stroke="#4f46e5" fillOpacity={1} fill="url(#colorPatients)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-lg shadow rounded-2xl p-4"
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-800">Satisfaction Trend</h2>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={sampleMetrics}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="satisfaction" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* AI panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 border border-gray-200 shadow rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Thermometer className="text-indigo-500" />
                <h2 className="font-semibold text-gray-800">NeuroEdge System Report</h2>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  trend === "Stable"
                    ? "bg-green-100 text-green-700"
                    : trend === "Rising"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trend}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed min-h-[70px]">{aiSummary}</p>

            <p className="mt-2 text-xs text-gray-500">
              Last updated: {new Date(refreshTime).toLocaleTimeString()}
            </p>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, delta, color }) {
  const colors = {
    emerald: "from-emerald-400/20 to-emerald-100/10 text-emerald-700",
    blue: "from-blue-400/20 to-blue-100/10 text-blue-700",
    purple: "from-purple-400/20 to-purple-100/10 text-purple-700",
    pink: "from-pink-400/20 to-pink-100/10 text-pink-700",
  };
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-4 bg-gradient-to-br ${colors[color]} rounded-2xl shadow backdrop-blur`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm font-medium text-gray-600">{label}</div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-xs text-green-600">{delta}</div>
        </div>
        <div className="p-3 bg-white/60 rounded-xl shadow-inner">{icon}</div>
      </div>
    </motion.div>
  );
    }
