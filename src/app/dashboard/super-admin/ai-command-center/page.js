'use client';

import { useEffect, useState } from 'react';
import RequireRole from '@/components/RequireRole';
import SuperAdminNavbar from '@/components/SuperAdminNavbar';
import SuperAdminSidebar from '@/components/SuperAdminSidebar';
import { Cpu, Shuffle, Zap, RefreshCw, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AI Command Center - v5.0
 * Role Protected: SuperAdmin Only
 * Voice + Vision NeuroEdge Integration Ready
 */

const COMMANDS = [
  {
    key: 'load_balance',
    label: 'Simulate Load Balancing',
    icon: <Shuffle size={18} />,
    description: 'Re-distribute patient sessions and balance hospital load.',
    steps: [
      'Analyzing current load...',
      'Proposing redistribution plan...',
      'Applying simulated changes...',
      'Verifying stability...'
    ]
  },
  {
    key: 'calibrate_model',
    label: 'Run Model Calibration',
    icon: <Cpu size={18} />,
    description: 'Calibrate NeuroEdge models with latest mock telemetry.',
    steps: [
      'Fetching mock telemetry...',
      'Fine-tuning model parameters...',
      'Validating results...',
      'Publishing calibration summary...'
    ]
  },
  {
    key: 'system_sync',
    label: 'Trigger System RefreshCw',
    icon: <Sync size={18} />,
    description: 'Sync configuration and caches across hospital clusters.',
    steps: [
      'Preparing sync manifest...',
      'Pushing changes to clusters...',
      'Confirming checksum integrity...',
      'Completing sync operation...'
    ]
  },
  {
    key: 'emergency_drill',
    label: 'Run Emergency Drill',
    icon: <ListChecks size={18} />,
    description: 'Simulate emergency workflows and test staff alerting.',
    steps: [
      'Initiating drill scenario...',
      'Notifying staff and systems...',
      'Monitoring response times...',
      'Scoring drill performance...'
    ]
  }
];

function AICommandCenter() {
  const [running, setRunning] = useState(null);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState([]);
  const [history, setHistory] = useState([]);
  const [aiNote, setAiNote] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('afya:aiCommandHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('afya:aiCommandHistory', JSON.stringify(history));
  }, [history]);

  async function runCommand(cmdKey) {
    if (busy) return;
    const cmd = COMMANDS.find((c) => c.key === cmdKey);
    if (!cmd) return;
    setRunning(cmdKey);
    setBusy(true);
    setProgress(0);
    setLog([]);
    setAiNote('');

    const totalSteps = cmd.steps.length;
    for (let i = 0; i < totalSteps; i++) {
      const stepText = cmd.steps[i];
      appendLog(`Step ${i + 1}/${totalSteps}: ${stepText}`);
      const wait = 700 + Math.floor(Math.random() * 900);
      await sleep(wait);
      setProgress(Math.round(((i + 1) / totalSteps) * 100));
    }

    appendLog('Finalizing...');
    await sleep(900);

    try {
      const prompt = `${cmd.label} finished. Provide a concise summary, risk assessment, and recommended next steps.`;
      const res = await fetch('/api/neuroedge', {
        method: 'POST',
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const aiReply = data.reply || 'NeuroEdge: operation completed (mock).';
      setAiNote(aiReply);
      appendLog('NeuroEdge: ' + aiReply);
      const record = {
        id: Date.now(),
        command: cmdKey,
        label: cmd.label,
        timestamp: new Date().toISOString(),
        summary: aiReply,
      };
      setHistory((h) => [record, ...h].slice(0, 50));
    } catch {
      appendLog('NeuroEdge unreachable (mock).');
      setAiNote('NeuroEdge AI currently unavailable.');
    }

    setRunning(null);
    setBusy(false);
    setProgress(0);
  }

  function appendLog(text) {
    setLog((l) => [`${new Date().toLocaleTimeString()} — ${text}`, ...l].slice(0, 50));
  }

  return (
    <RequireRole allowed={['superadmin']}>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <SuperAdminNavbar />
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">AI Command Center</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Execute NeuroEdge-powered commands for operations simulation and orchestration.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">History:</div>
                <div className="px-3 py-2 bg-white/60 rounded-lg shadow">{history.length} runs</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMMANDS.map((cmd) => {
                    const active = running === cmd.key;
                    return (
                      <motion.div
                        key={cmd.key}
                        layout
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl border shadow-md ${
                          active
                            ? 'bg-white/90 border-green-200'
                            : 'bg-white/70 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-indigo-50 p-2 rounded">{cmd.icon}</div>
                            <div>
                              <div className="font-semibold text-gray-800">{cmd.label}</div>
                              <div className="text-sm text-gray-600">{cmd.description}</div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                disabled={busy && !active}
                                onClick={() => runCommand(cmd.key)}
                                className={`px-3 py-2 rounded-md font-medium ${
                                  active
                                    ? 'bg-green-600 text-white'
                                    : 'bg-indigo-600 text-white'
                                } disabled:opacity-50`}
                              >
                                {active ? 'Running…' : 'Run'}
                              </button>
                              <button
                                onClick={() => {
                                  appendLog(`Inspect ${cmd.label}`);
                                  setAiNote(
                                    `Quick inspect for ${cmd.label}: nominal (mock).`
                                  );
                                }}
                                className="px-2 py-2 rounded border text-sm"
                              >
                                Inspect
                              </button>
                            </div>
                          </div>
                        </div>

                        {active && (
                          <div className="mt-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-500 transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Progress: {progress}%
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="bg-white/70 p-4 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-800">Operation Logs</div>
                    <button
                      onClick={() => {
                        setLog([]);
                        appendLog('Cleared logs');
                      }}
                      className="text-sm text-indigo-600"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="max-h-48 overflow-auto font-mono text-xs text-gray-700 bg-white/30 p-2 rounded">
                    <AnimatePresence>
                      {log.length === 0 && (
                        <div className="text-gray-400">
                          No logs yet — run a command to start
                        </div>
                      )}
                      {log.map((l, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="py-1 border-b last:border-b-0"
                        >
                          {l}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">NeuroEdge Summary</div>
                    <div className="text-sm text-gray-500">AI Explanation (mock)</div>
                  </div>
                  <div className="mt-3 text-gray-700 min-h-[64px]">
                    {aiNote ||
                      'No AI notes yet. Run a command to get NeuroEdge commentary.'}
                  </div>
                </div>
              </div>

              <aside className="space-y-4">
                <div className="p-4 bg-white/80 rounded-2xl shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Quick Actions</div>
                    <div className="text-xs text-gray-500">Simulation</div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <button
                      onClick={() => runCommand('system_sync')}
                      className="w-full text-left px-3 py-2 bg-indigo-600 text-white rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <SyncIcon /> Trigger Full Sync
                      </div>
                    </button>

                    <button
                      onClick={() => runCommand('emergency_drill')}
                      className="w-full text-left px-3 py-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2">
                        <ZapIcon /> Run Emergency Drill
                      </div>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white/80 rounded-2xl shadow-md">
                  <div className="font-semibold mb-2">Recent Runs</div>
                  <div className="space-y-2">
                    {history.length === 0 && (
                      <div className="text-sm text-gray-500">No runs yet</div>
                    )}
                    {history.map((h) => (
                      <div key={h.id} className="p-2 rounded border">
                        <div className="text-sm font-medium">{h.label}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(h.timestamp).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">
                          {h.summary?.slice(0, 100)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </RequireRole>
  );
}

function SyncIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 12a9 9 0 10-3.6 7.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M21 3v6h-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export default AICommandCenter;
