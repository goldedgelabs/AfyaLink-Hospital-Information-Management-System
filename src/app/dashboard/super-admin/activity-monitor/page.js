"use client";

import { useEffect, useState } from "react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import {
  Activity,
  Cpu,
  Users,
  Database,
  BarChart3,
  Server,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function ActivityMonitor() {
  const [activityData, setActivityData] = useState([]);
  const [systemLoad, setSystemLoad] = useState(38);
  const [patientsOnline, setPatientsOnline] = useState(124);
  const [aiUsage, setAiUsage] = useState(72);

  // Simulate live system metrics
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      setActivityData((prev) => [
        ...prev.slice(-19),
        {
          time: now,
          load: Math.min(100, Math.max(0, systemLoad + (Math.random() * 10 - 5))),
          ai: Math.min(100, Math.max(0, aiUsage + (Math.random() * 10 - 5))),
          patients: patientsOnline + Math.floor(Math.random() * 8 - 4),
        },
      ]);
      setSystemLoad((p) => Math.min(100, Math.max(0, p + (Math.random() * 8 - 4))));
      setAiUsage((p) => Math.min(100, Math.max(0, p + (Math.random() * 6 - 3))));
      setPatientsOnline((p) => Math.max(80, p + Math.floor(Math.random() * 10 - 5)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <SuperAdminNavbar />

        <main className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Activity className="text-green-600" /> Real-Time Activity Monitor
            </h1>
            <span className="text-gray-600">
              Powered by <strong>NeuroEdge Live Stream</strong>
            </span>
          </div>

          {/* Metrics overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              icon={<Server className="text-indigo-500" />}
              label="System Load"
              value={`${systemLoad.toFixed(1)}%`}
              gradient="from-indigo-500 to-purple-500"
            />
            <MetricCard
              icon={<Users className="text-green-500" />}
              label="Active Patients"
              value={patientsOnline}
              gradient="from-green-500 to-teal-500"
            />
            <MetricCard
              icon={<Cpu className="text-rose-500" />}
              label="NeuroEdge AI Usage"
              value={`${aiUsage.toFixed(1)}%`}
              gradient="from-rose-500 to-pink-500"
            />
            <MetricCard
              icon={<Database className="text-amber-500" />}
              label="Data Sync Health"
              value="99.8%"
              gradient="from-yellow-500 to-amber-500"
            />
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <BarChart3 className="text-blue-600" /> Live Performance Chart
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="load"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                  name="System Load"
                />
                <Line
                  type="monotone"
                  dataKey="ai"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={false}
                  name="AI Usage"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Cpu className="text-indigo-600" /> NeuroEdge Intelligence Trends
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ai"
                  stroke="#7c3aed"
                  fillOpacity={1}
                  fill="url(#aiGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

// reusable card
function MetricCard({ icon, label, value, gradient }) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r ${gradient} p-[1px] shadow-md hover:shadow-lg transition`}
    >
      <div className="bg-white rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 text-gray-700">
          <div className="bg-gray-100 p-2 rounded-xl">{icon}</div>
          <div>
            <p className="text-sm">{label}</p>
            <h3 className="text-lg font-semibold">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
        }
