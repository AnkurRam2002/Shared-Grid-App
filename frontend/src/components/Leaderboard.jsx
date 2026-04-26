import React from 'react';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ grid }) => {
  const stats = React.useMemo(() => {
    const counts = {};
    Object.values(grid).forEach(cell => {
      if (cell.owner) {
        if (!counts[cell.owner]) {
          counts[cell.owner] = { count: 0, name: cell.ownerName || 'Someone' };
        }
        counts[cell.owner].count += 1;
      }
    });

    return Object.entries(counts)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [grid]);

  return (
    <div className="glass p-6 rounded-2xl w-full max-w-xs">
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
        <Trophy className="text-amber-400 w-5 h-5" />
        <h2 className="font-bold text-lg">Leaderboard</h2>
      </div>
      
      {stats.length === 0 ? (
        <p className="text-slate-500 text-sm italic text-center py-4">No claims yet. Start clicking!</p>
      ) : (
        <div className="space-y-4">
          {stats.map((user, index) => (
            <div key={user.id} className={`flex items-center justify-between group pb-3 ${index !== stats.length - 1 ? 'border-b border-white/5' : ''}`}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-500 w-4">{index + 1}.</span>
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: Object.values(grid).find(c => c.owner === user.id)?.color }}
                />
                <span className="text-sm font-medium">
                  {user.name}
                </span>
              </div>
              <span className="text-sm font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded">
                {user.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
