import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';

function App() {
  const [health, setHealth] = useState<{ status: string; timestamp: string; uptime: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Health check failed');
        return res.json();
      })
      .then((data) => {
        setHealth(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-500 animate-pulse" />
            <h1 className="text-xl font-bold tracking-tight">Status Monitor</h1>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
          </span>
        </div>

        <hr className="border-slate-800" />

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Backend Connection</h2>
          
          {loading && (
            <div className="text-slate-400 text-sm animate-pulse">Checking API connection...</div>
          )}

          {error && (
            <div className="flex items-center gap-3 p-3 bg-red-950/30 border border-red-900/50 rounded-xl text-red-400 text-sm">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span>Offline: {error}</span>
            </div>
          )}

          {health && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-950/30 border border-emerald-900/50 rounded-xl text-emerald-400 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Backend is active and healthy</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-900">
                <div>
                  <span className="text-slate-500 block">Status</span>
                  <span className="text-emerald-400 font-semibold">{health.status}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Uptime</span>
                  <span className="text-slate-300">{health.uptime.toFixed(0)}s</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
