"use client";

import { useEffect, useState } from "react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import {
  AlertTriangle,
  Activity,
  Bell,
  Cpu,
  Hospital,
  Users,
  HeartPulse,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAlertCenter() {
  const [alerts, setAlerts] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    critical: 0,
    moderate: 0,
    normal: 0,
  });

  // Generate AI alerts dynamically every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = generateRandomAlert();
      setAlerts((prev) => [newAlert, ...prev.slice(0, 8)]);

      // Update summary
      setSummary((prev) => ({
        total: prev.total + 1,
        critical:
          newAlert.level === "critical" ? prev.critical + 1 : prev.critical,
        moderate:
          newAlert.level === "moderate" ? prev.moderate + 1 : prev.moderate,
        normal:
          newAlert.level === "normal" ? prev.normal + 1 : prev.normal,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <SuperAdminNavbar />

        <main className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800">
              <Bell className="text-rose-600" /> AI Alert Center
            </h1>
            <span className="text-sm text-gray-600">
              Powered by <strong>NeuroEdge Predictive Engine</strong>
            </span>
          </div>

          {/* Overview Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
              icon={<Bell className="text-indigo-500" />}
              label="Total Alerts"
              value={summary.total}
              color="from-indigo-500 to-purple-500"
            />
            <SummaryCard
              icon={<AlertTriangle className="text-rose-500" />}
              label="Critical Alerts"
              value={summary.critical}
              color="from-rose-500 to-pink-500"
            />
            <SummaryCard
              icon={<Activity className="text-amber-500" />}
              label="Moderate Alerts"
              value={summary.moderate}
              color="from-amber-500 to-yellow-500"
            />
            <SummaryCard
              icon={<Users className="text-green-500" />}
              label="Normal Activity"
              value={summary.normal}
              color="from-green-500 to-emerald-500"
            />
          </div>

          {/* Live AI Alerts Feed */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Cpu className="text-blue-600" /> NeuroEdge Live Predictions
            </h2>

            <div className="space-y-3">
              <AnimatePresence>
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`border-l-4 rounded-xl p-4 shadow-sm ${
                      alert.level === "critical"
                        ? "border-rose-500 bg-rose-50"
                        : alert.level === "moderate"
                        ? "border-amber-400 bg-amber-50"
                        : "border-green-400 bg-green-50"
                    }`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {alert.title}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {alert.description}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {alert.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Predictive Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <HeartPulse className="text-blue-700" /> Predictive Health Insights
            </h2>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>🧠 AI forecasts an increase in hospital load over the next 12 hours.</li>
              <li>🫀 Predicted spike in cardiovascular emergency cases in urban regions.</li>
              <li>🧬 Lab automation systems operating at 94% optimal efficiency.</li>
              <li>🩺 Patient satisfaction trend expected to rise by 6% this week.</li>
              <li>🧘‍♂️ AI recommends proactive restocking of essential drugs by Friday.</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

// 🧩 Utility Functions
function generateRandomAlert() {
  const levels = ["critical", "moderate", "normal"];
  const level = levels[Math.floor(Math.random() * levels.length)];
  const titles = {
    critical: [
      "🚨 Overload in Nairobi Hospital detected",
      "🧠 AI detected abnormal patient vitals spike",
      "🔥 Lab system under critical strain",
    ],
    moderate: [
      "⚠️ Increase in appointment queue size",
      "🔄 Pharmacy restock threshold reached",
      "💡 AI model retraining scheduled soon",
    ],
    normal: [
      "✅ Routine system scan completed",
      "🌿 All hospital clusters stable",
      "📦 Drug inventory within safe limits",
    ],
  };

  const descriptions = {
    critical: "Immediate attention required to prevent service disruption.",
    moderate: "Monitor ongoing activity for possible escalation.",
    normal: "No action required — systems running smoothly.",
  };

  return {
    id: Date.now(),
    level,
    title: titles[level][Math.floor(Math.random() * titles[level].length)],
    description: descriptions[level],
    timestamp: new Date().toLocaleTimeString(),
  };
}

// 🧠 Card Component
function SummaryCard({ icon, label, value, color }) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r ${color} p-[1px] shadow-md hover:shadow-lg`}
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
