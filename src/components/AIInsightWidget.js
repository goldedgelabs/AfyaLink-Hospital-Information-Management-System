// src/components/AIInsightWidget.js
"use client";
import { useEffect, useState } from "react";

export default function AIInsightWidget({ prompt = "Summarize system status" }) {
  const [insight, setInsight] = useState("Loading...");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const r = await fetch("/api/neuroedge", { method: "POST", body: JSON.stringify({ prompt }) });
        const d = await r.json();
        if (mounted) setInsight(d.reply || "No insight");
      } catch (e) {
        if (mounted) setInsight("AI service unavailable");
      }
    })();
    return () => (mounted = false);
  }, [prompt]);

  return (
    <div className="p-3 rounded-lg bg-white/4 backdrop-blur">
      <h4 className="text-sm font-medium mb-1">NeuroEdge Insight</h4>
      <p className="text-sm text-gray-200">{insight}</p>
    </div>
  );
}
