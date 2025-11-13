"use client";

import { useEffect, useState, useRef } from "react";
import SuperAdminNavbar from "@/components/SuperAdminNavbar";
import SuperAdminSidebar from "@/components/SuperAdminSidebar";
import useVoiceAssistant from "@/hooks/useVoiceAssistant";

/**
 * Collaboration page:
 * - Room chat stored in localStorage (key: "afya:collab:room")
 * - Shared notes (localStorage)
 * - AI quick-summarize using /api/neuroedge (mock)
 */

const ROOM_KEY = "afya:collab:room";
const NOTES_KEY = "afya:collab:notes";

export default function CollaborationPage() {
  const [messages, setMessages] = useState([]);
  const [note, setNote] = useState("");
  const [text, setText] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState("SuperAdmin");
  const voice = useVoiceAssistant();
  const listRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(ROOM_KEY) || "[]");
    setMessages(saved);
    const savedNotes = localStorage.getItem(NOTES_KEY) || "";
    setNote(savedNotes);

    // polling to simulate "real-time" across tabs/windows
    const iv = setInterval(() => {
      const latest = JSON.parse(localStorage.getItem(ROOM_KEY) || "[]");
      setMessages(latest);
    }, 1500);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    // scroll to bottom on new message
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function pushMessage(msg) {
    const next = [msg, ...messages].slice(0, 200);
    setMessages(next);
    localStorage.setItem(ROOM_KEY, JSON.stringify(next));
  }

  function handleSend() {
    if (!text.trim()) return;
    const msg = {
      id: Date.now(),
      sender: userName,
      text: text.trim(),
      ts: new Date().toISOString(),
    };
    pushMessage(msg);
    setText("");
  }

  async function handleAISummarize() {
    setSending(true);
    try {
      const convo = messages.slice(0, 50).map(m => `${m.sender}: ${m.text}`).reverse().join("\n");
      const prompt = `Summarize the following collaboration chat into 3 action items:\n${convo}`;
      const res = await fetch("/api/neuroedge", { method: "POST", body: JSON.stringify({ prompt }) });
      const data = await res.json();
      setAiSummary(data.reply || "NeuroEdge summary (mock)");
    } catch (e) {
      setAiSummary("NeuroEdge unavailable (mock).");
    } finally {
      setSending(false);
    }
  }

  function saveNotes() {
    localStorage.setItem(NOTES_KEY, note);
    alert("Notes saved locally");
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-emerald-50">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col">
        <SuperAdminNavbar />

        <main className="p-6 flex gap-6">
          {/* Chat Column */}
          <div className="w-2/3 bg-white/80 rounded-2xl p-4 shadow flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Collaboration Room</h2>
              <div className="flex items-center gap-2">
                <input className="border px-2 py-1 rounded" value={userName} onChange={e=>setUserName(e.target.value)} />
                <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={()=>voice.speak("Hello team, collaboration mode active")}>Announce</button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 overflow-auto p-2 space-y-2 border rounded mb-3" style={{maxHeight: '60vh'}}>
              {messages.slice().reverse().map(m => (
                <div key={m.id} className={`p-2 rounded ${m.sender === userName ? 'bg-indigo-50 self-end' : 'bg-gray-50'}`}>
                  <div className="text-xs text-gray-500">{m.sender} • {new Date(m.ts).toLocaleTimeString()}</div>
                  <div className="mt-1">{m.text}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a message..." className="flex-1 border p-2 rounded" />
              <button onClick={handleSend} className="px-4 py-2 bg-green-600 text-white rounded">Send</button>
              <button onClick={()=>voice.start(t=>setText(text + ' ' + t))} className="px-3 py-2 border rounded">🎤</button>
            </div>
          </div>

          {/* Notes & AI Column */}
          <aside className="w-1/3 space-y-4">
            <div className="bg-white/80 p-4 rounded-2xl shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Shared Notes</h3>
                <button onClick={saveNotes} className="text-sm text-indigo-600">Save</button>
              </div>
              <textarea value={note} onChange={(e)=>setNote(e.target.value)} className="w-full h-40 p-2 border rounded" />
            </div>

            <div className="bg-white/80 p-4 rounded-2xl shadow">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">AI Assistant</h3>
                <button onClick={handleAISummarize} className="text-sm text-indigo-600" disabled={sending}>{sending ? '...' : 'Summarize'}</button>
              </div>

              <div className="mt-3 min-h-[120px] text-sm text-gray-800 bg-gray-50 p-3 rounded">
                {aiSummary || <span className="text-gray-500">No summary yet — click Summarize to get NeuroEdge action items.</span>}
              </div>
            </div>

          </aside>
        </main>
      </div>
    </div>
  );
}
