"use client";

import { useState, useEffect } from "react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import { ToggleLeft, ToggleRight, Activity, Shield, Cpu, Cloud } from "lucide-react";

export default function SystemControlCenter() {
  const defaultModules = [
    { key: "telehealth", name: "TeleHealth & Consults", enabled: true, icon: <Cloud /> },
    { key: "lab", name: "Laboratory Module", enabled: true, icon: <Activity /> },
    { key: "pharmacy", name: "Pharmacy Management", enabled: true, icon: <Shield /> },
    { key: "billing", name: "Billing & Invoicing", enabled: true, icon: <Shield /> },
    { key: "insurance", name: "Insurance Portal", enabled: false, icon: <Shield /> },
    { key: "ai_analytics", name: "NeuroEdge AI & Predictive Insights", enabled: true, icon: <Cpu /> },
    { key: "inventory", name: "Inventory & Assets", enabled: false, icon: <Shield /> },
    { key: "hr", name: "Human Resource & Staff Management", enabled: false, icon: <Shield /> },
  ];

  const [modules, setModules] = useState(defaultModules);

  useEffect(() => {
    const saved = localStorage.getItem("afyalinkModules");
    if (saved) setModules(JSON.parse(saved));
  }, []);

  const toggleModule = (key) => {
    const updated = modules.map((m) =>
      m.key === key ? { ...m, enabled: !m.enabled } : m
    );
    setModules(updated);
    localStorage.setItem("afyalinkModules", JSON.stringify(updated));
  };

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <SuperAdminNavbar />

        <main className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Cpu className="text-indigo-600" /> System Control Center
            </h1>
            <span className="text-gray-600">
              Active Modules:{" "}
              <strong className="text-green-600">{enabledCount}</strong> /{" "}
              {modules.length}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.key}
                className={`rounded-2xl p-5 shadow-md transition-all border
                ${
                  module.enabled
                    ? "bg-white/80 border-green-300 hover:shadow-lg"
                    : "bg-gray-100 border-gray-300 opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-gray-800">
                    <span className="text-indigo-600">{module.icon}</span>
                    <h2 className="text-lg font-semibold">{module.name}</h2>
                  </div>
                  <button
                    onClick={() => toggleModule(module.key)}
                    className="focus:outline-none"
                  >
                    {module.enabled ? (
                      <ToggleRight className="text-green-500 w-8 h-8" />
                    ) : (
                      <ToggleLeft className="text-gray-400 w-8 h-8" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-600">
                  {module.enabled
                    ? "✅ Active — this module is currently running and synced with system core."
                    : "⚙️ Disabled — module temporarily inactive but can be enabled anytime."}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-indigo-600/90 text-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-2">
              NeuroEdge AI System Insight
            </h3>
            <p className="text-sm text-indigo-100 mb-4">
              AI projection suggests enabling all medical intelligence modules
              enhances predictive care accuracy by{" "}
              <strong>78%</strong> and patient satisfaction by{" "}
              <strong>65%</strong>.
            </p>
            <button
              onClick={() =>
                alert("💡 NeuroEdge is analyzing full system performance...")
              }
              className="bg-white text-indigo-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-100"
            >
              Run NeuroEdge System Scan
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
