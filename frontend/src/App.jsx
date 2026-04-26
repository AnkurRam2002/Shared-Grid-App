import React, { useMemo } from 'react';
import { getOrCreateUser } from './utils/user';
import { useSocket } from './hooks/useSocket';
import Cell from './components/Cell';
import Leaderboard from './components/Leaderboard';
import { Activity, MousePointer2, RefreshCcw } from 'lucide-react';

function App() {
  const user = useMemo(() => getOrCreateUser(), []);
  const { grid, isConnected, claimCell, cooldown } = useSocket(user);

  const gridArray = useMemo(() => {
    return Array.from({ length: 400 }, (_, i) => {
      const x = Math.floor(i / 20);
      const y = i % 20;
      return grid[`${x}-${y}`] || { x, y, color: '#374151' };
    });
  }, [grid]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center gap-8">
      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-blue-500">
            Shared Grid
          </h1>
          <p className="text-slate-400 flex items-center gap-2 mt-1">
            Real-time collaborative canvas 
            <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${isConnected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Your Identity</p>
              <p className="text-sm font-mono">{user.id.slice(0, 8)}</p>
            </div>
            <div 
              className="w-8 h-8 rounded-lg shadow-inner ring-2 ring-white/10" 
              style={{ backgroundColor: user.color }} 
            />
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-center">
        {/* Main Grid Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="glass p-2 rounded-xl shadow-2xl relative">
            <div className="grid grid-cols-20 gap-1 bg-slate-800/50 p-1 rounded-lg">
              {gridArray.map((cell) => (
                <Cell 
                  key={`${cell.x}-${cell.y}`} 
                  cell={cell} 
                  onClick={claimCell}
                  isCooldown={cooldown > 0}
                />
              ))}
            </div>

            {/* Cooldown Overlay */}
            {cooldown > 0 && (
              <div className="absolute top-4 right-4 pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl animate-bounce">
                  <RefreshCcw className="w-4 h-4 text-blue-400 animate-spin" />
                  <span className="text-xs font-bold text-blue-400">Cooldown: {cooldown}s</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
             <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-full">
               <MousePointer2 className="w-3 h-3" />
               Click a cell to claim it
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-full">
               <Activity className="w-3 h-3" />
               Updates happen instantly for everyone
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-auto flex flex-col gap-6">
          <Leaderboard grid={grid} />
          
          <div className="glass p-6 rounded-2xl w-full max-w-xs border-dashed border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Project Info</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This grid is shared across all users globally. Claim cells to mark your territory! 
              Atomic updates ensure that only one user can claim a cell at a time.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
