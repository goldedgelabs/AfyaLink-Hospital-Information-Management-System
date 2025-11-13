'use client';

import { useState } from 'react';
import { startListening, playSpeech } from '@/ai/voice';

export default function NeuroEdgeChatDock() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [q, setQ] = useState('');

  const ask = async (text) => {
    // Add user message
    setMessages((m) => [...m, { from: 'me', text }]);

    // Send to AI endpoint
    const res = await fetch('/api/neuroedge', {
      method: 'POST',
      body: JSON.stringify({ prompt: text }),
    });
    const data = await res.json();

    // Add AI response
    setMessages((m) => [...m, { from: 'ai', text: data.reply }]);

    // Play AI speech
    playSpeech(data.reply);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 18,
        bottom: 18,
        width: 340,
        zIndex: 999,
      }}
    >
      <div className="card p-3 bg-white shadow rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center">
          <strong>NeuroEdge</strong>
          <button
            onClick={() => setOpen((o) => !o)}
            className="px-2 py-1 rounded hover:bg-gray-100"
          >
            {open ? '-' : '+'}
          </button>
        </div>

        {/* Chat Content */}
        {open && (
          <div>
            {/* Messages */}
            <div
              style={{
                maxHeight: 180,
                overflowY: 'auto',
                marginTop: 8,
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    margin: 6,
                    padding: 6,
                    background:
                      m.from === 'ai'
                        ? 'rgba(2,6,23,0.06)'
                        : 'rgba(255,255,255,0.02)',
                    borderRadius: 8,
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="p-2 rounded border bg-transparent flex-1"
                placeholder="Type your question..."
              />
              <button
                onClick={() => {
                  if (q) {
                    ask(q);
                    setQ('');
                  }
                }}
                className="btn-primary p-2 rounded"
              >
                Ask
              </button>
              <button
                onClick={() =>
                  startListening((t) => {
                    setQ(t);
                  })
                }
                className="p-2 rounded border"
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
