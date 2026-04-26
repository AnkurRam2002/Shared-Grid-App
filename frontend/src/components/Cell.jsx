import { motion } from 'framer-motion';

const Cell = ({ cell, onClick, isCooldown }) => {
  const isOwned = !!cell.owner;

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: cell.color || '#374151',
      }}
      transition={{ duration: 0.5 }}
      onClick={() => !isCooldown && onClick(cell.x, cell.y)}
      className={`grid-cell group relative ${isCooldown ? 'cursor-not-allowed opacity-80' : ''}`}
      title={isOwned ? `Owned by: ${cell.ownerName || 'Someone'}` : 'Click to claim!'}
    >
      {/* Tooltip on hover */}
      {isOwned && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none">
          <div className="bg-slate-800 text-xs py-1 px-2 rounded border border-slate-700 whitespace-nowrap shadow-xl">
            <span className="text-slate-400">Owner:</span> {cell.ownerName || 'Someone'}
          </div>
          <div className="w-2 h-2 bg-slate-800 border-r border-b border-slate-700 rotate-45 mx-auto -mt-1"></div>
        </div>
      )}
    </motion.div>
  );
};

export default Cell;
