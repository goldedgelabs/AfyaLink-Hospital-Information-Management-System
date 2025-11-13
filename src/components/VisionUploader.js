"use client";

import { useState } from "react";

/**
 * VisionUploader
 * - Allows upload of an image file, previews it, encodes to base64 and sends to /api/neuroedge (mock)
 * - onAnalysisEnd(reply) is called with the AI reply text
 */

export default function VisionUploader({ onAnalysisStart, onAnalysisEnd }) {
  const [filePreview, setFilePreview] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [notes, setNotes] = useState("");

  async function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result;
      setFilePreview(base64);
      // Mock sending image -> call /api/neuroedge with a prompt containing base64 (server will ignore and return mock)
      if (onAnalysisStart) onAnalysisStart();
      setProcessing(true);
      try {
        // In real integration you'd POST to a vision endpoint that accepts binary or base64
        const prompt = `Analyze image for key findings (image length ${String(base64).length}). Provide likely diagnosis and recommended next steps.`;
        const res = await fetch("/api/neuroedge", {
          method: "POST",
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        const reply = data.reply || "Mock NeuroEdge vision analysis: notable features (mock)";
        setNotes(reply);
        if (onAnalysisEnd) onAnalysisEnd(reply);
      } catch (err) {
        const errReply = "NeuroEdge vision offline — analysis not available (mock).";
        setNotes(errReply);
        if (onAnalysisEnd) onAnalysisEnd(errReply);
      } finally {
        setProcessing(false);
      }
    };
    reader.readAsDataURL(f);
  }

  return (
    <div className="bg-white/80 p-4 rounded-2xl shadow">
      <h3 className="font-medium text-gray-700">Vision Uploader</h3>
      <p className="text-sm text-gray-600 mt-1">Upload an image and let NeuroEdge run a quick visual diagnosis (mocked).</p>

      <div className="mt-3 flex gap-4">
        <label className="cursor-pointer inline-block">
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <div className="px-4 py-2 bg-indigo-600 text-white rounded">Upload Image</div>
        </label>

        <button
          onClick={() => {
            // re-run analysis if preview exists
            if (!filePreview) return alert("Upload an image first");
            // simply POST current preview base64 to /api/neuroedge again
            (async () => {
              if (onAnalysisStart) onAnalysisStart();
              setProcessing(true);
              try {
                const prompt = `Re-analyze the previously uploaded image.`;
                const res = await fetch("/api/neuroedge", { method: "POST", body: JSON.stringify({ prompt }) });
                const data = await res.json();
                const reply = data.reply || "NeuroEdge re-analysis (mock)";
                setNotes(reply);
                if (onAnalysisEnd) onAnalysisEnd(reply);
              } catch (e) {
                const errReply = "NeuroEdge re-analysis failed (mock)";
                setNotes(errReply);
                if (onAnalysisEnd) onAnalysisEnd(errReply);
              } finally {
                setProcessing(false);
              }
            })();
          }}
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          {processing ? "Analyzing…" : "Analyze"}
        </button>

        <button onClick={() => { setFilePreview(null); setNotes(""); }} className="px-3 py-2 border rounded">Clear</button>
      </div>

      {filePreview && (
        <div className="mt-4 flex gap-4 items-start">
          <img src={filePreview} alt="preview" className="w-48 h-48 object-contain rounded border" />
          <div className="flex-1">
            <div className="bg-gray-50 p-3 rounded">
              <strong className="block mb-1">Vision Notes (mock)</strong>
              <div className="text-sm text-gray-700">{notes}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
    }
