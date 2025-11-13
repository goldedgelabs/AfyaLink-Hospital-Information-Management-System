"use client";

import { useEffect, useState } from "react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import VisionUploader from "@/components/VisionUploader";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";

export default function NeuroEdgeLabPage() {
  const [transcript, setTranscript] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const voice = useVoiceAssistant();

  // Speak a prompt to NeuroEdge (uses existing /api/neuroedge)
  const askNeuroEdge = async (prompt) => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/neuroedge", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAiReply(data.reply || "NeuroEdge: no reply (mock)");
    } catch (e) {
      setAiReply("NeuroEdge unreachable — running in offline mock mode.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-indigo-50">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <SuperAdminNavbar />

        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">NeuroEdge Lab — Voice & Vision</h1>
              <p className="text-sm text-gray-600 mt-1">
                Upload an image (x-ray, photo, lesion) or speak to NeuroEdge for a quick mocked analysis.
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  if (!voice.supported()) return alert("Voice not supported");
                  voice.start((t) => setTranscript(t));
                }}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md mr-2"
              >
                🎤 Start Voice
              </button>
              <button
                onClick={() => {
                  if (transcript) askNeuroEdge(transcript);
                }}
                className="px-3 py-2 bg-green-600 text-white rounded-md"
              >
                Ask NeuroEdge
              </button>
            </div>
          </div>

          {/* Transcript */}
          <div className="bg-white/80 p-4 rounded-2xl shadow">
            <h3 className="font-medium text-gray-700">Voice Transcript</h3>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full mt-2 p-3 border rounded"
              rows={3}
              placeholder="Speak or type your question (e.g., 'Analyze this chest x-ray for consolidation')"
            />
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={() => {
                  if (!transcript) return alert("Enter a prompt");
                  askNeuroEdge(transcript);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                {analyzing ? "Analyzing…" : "Send to NeuroEdge"}
              </button>
              <button
                onClick={() => { setTranscript(""); setAiReply(""); }}
                className="px-3 py-2 border rounded"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Vision Uploader */}
          <VisionUploader
            onAnalysisStart={() => setAnalyzing(true)}
            onAnalysisEnd={(reply) => { setAiReply(reply); setAnalyzing(false); }}
          />

          {/* AI Reply */}
          <div className="bg-white/80 p-4 rounded-2xl shadow">
            <h3 className="font-medium text-gray-700">NeuroEdge Analysis</h3>
            <div className="mt-3 text-gray-800 min-h-[80px]">
              {aiReply ? <pre className="whitespace-pre-wrap">{aiReply}</pre> : <span className="text-gray-500">No analysis yet.</span>}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
    }
