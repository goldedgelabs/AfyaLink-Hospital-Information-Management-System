"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Brain, Activity, Users, Hospital, DollarSign } from "lucide-react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({});
  const [aiSummary, setAISummary] = useState("");
  const [loading, setLoading] = useState(false);

  const COLORS = ["#6366F1", "#22C55E", "#FACC15", "#EF4444", "#3B82F6"];

  // Fetch mock analytics data
  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  // Ask NeuroEdge AI for a system insight
  const handleAskAI = async () => {
    setLoading(true);
    const res = await fetch("/api/neuroedge", {
      method: "POST",
      body: JSON.stringify({
        prompt: "Analyze AfyaLink system performance and suggest improvements",
      }),
    });
    const data = await res.json();
    setAISummary(data.reply);
    setLoading(false);
  };

  const mockRevenue = [
    { month: "Jan", revenue: 14000 },
    { month: "Feb", revenue: 21000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 26000 },
    { month: "May", revenue: 31000 },
    { month: "Jun", revenue: 29000 },
  ];

  const satisfactionData = [
    { name: "Satisfied", value: 92 },
    { name: "Dissatisfied", value: 8 },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <SuperAdminNavbar />
        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Super Admin Dashboard
          </h1>

          {/* KPIs Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPI
              icon={<Users className="text-indigo-600" size={28} />}
              label="Total Patients"
              value={stats.totalPatients}
            />
            <KPI
              icon={<Hospital className="text-green-600" size={28} />}
              label="Active Doctors"
              value={stats.activeDoctors}
            />
            <KPI
              icon={<Activity className="text-yellow-600" size={28} />}
              label="Pending Appointments"
              value={stats.pendingAppointments}
            />
            <KPI
              icon={<DollarSign className="text-blue-600" size={28} />}
              label="Revenue"
              value={`KSh ${stats.revenue?.toLocaleString()}`}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Line Chart */}
            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">
                Revenue Growth (Mock)
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={mockRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Satisfaction Pie Chart */}
            <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">
                Patient Satisfaction
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={satisfactionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {satisfactionData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Summary */}
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Brain className="text-indigo-600" /> NeuroEdge AI Insights
            </h2>
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
            >
              {loading ? "Analyzing..." : "Ask NeuroEdge AI"}
            </button>
            {aiSummary && (
              <p className="mt-4 text-gray-700 leading-relaxed">{aiSummary}</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function KPI({ icon, label, value }) {
  return (
    <div className="p-5 bg-white/70 backdrop-blur-md rounded-2xl shadow-md flex items-center space-x-4">
      <div>{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-xl font-semibold text-gray-900">
          {value ?? "—"}
        </p>
      </div>
    </div>
  );
      }
