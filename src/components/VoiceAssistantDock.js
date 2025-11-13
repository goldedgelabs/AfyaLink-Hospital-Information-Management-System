// src/components/VoiceAssistantDock.js
"use client";
import { useState } from "react";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";

export default function VoiceAssistantDock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const voice = useVoiceAssistant();

  async function ask(q) {
    if (!q) return;
    setMessages((m) => [...m, { from: "user", text: q }]);
    // call existing mock NeuroEdge endpoint
    const r = await fetch("/api/neuroedge", { method: "POST", body: JSON.stringify({ prompt: q }) });
    const data = await r.json();
    const reply = data.reply || "NeuroEdge: no reply";
    setMessages((m) => [...m, { from: "ai", text: reply }]);
    voice.speak(reply);
  }

  return (
    <div style={{ position: "fixed", right: 18, bottom: 18, zIndex: 999 }}>
      <div className="w-80">
        <div className="flex items-center justify-between p-3 bg-white/6 rounded-xl backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#00BFA6] to-[#8E2DE2] rounded-full flex items-center justify-center text-white font-bold">N</div>
            <div className="font-semibold">NeuroEdge</div>
          </div>
          <div>
            <button onClick={() => setOpen((o) => !o)} className="px-2 py-1 rounded bg-white/5"> {open ? "−" : "+"} </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 p-3 bg-white/4 rounded-xl backdrop-blur shadow-inner">
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {messages.map((m, i) => (
                <div key={i} className={`my-2 p-2 rounded ${m.from === "ai" ? "bg-white/6" : "bg-white/3"}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 rounded bg-transparent border border-white/6"
                placeholder="Ask NeuroEdge..."
              />
              <button
                onClick={() => { ask(input); setInput(""); }}
                className="px-3 py-2 rounded bg-[#00BFA6] text-white"
              >
                Ask
              </button>

              <button
                title={voice.listening ? "Stop listening" : "Start voice"}
                onClick={() => {
                  if (!voice.supported()) { alert("Voice not supported in this browser"); return; }
                  if (!voice.listening) voice.start((t) => setInput(t));
                  else voice.stop();
                }}
                className="px-2 py-2 rounded border"
              >
                🎤
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  }
