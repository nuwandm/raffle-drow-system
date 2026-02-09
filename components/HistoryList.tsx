import type { DrawHistoryEntry } from '@/lib/types';
import { formatTimestamp } from '@/lib/format';

type HistoryListProps = {
  history: DrawHistoryEntry[];
  onClear: () => void;
};

export default function HistoryList({ history, onClear }: HistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-black to-purple-950 rounded-lg shadow-xl p-6 mb-6 border-2 border-blood-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blood-900/10 to-transparent"></div>
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-2xl font-horror font-bold text-blood-500 text-eerie-glow">
          ⚰️ The Fallen Ones ({history.length})
        </h2>
        <button
          onClick={onClear}
          className="px-5 py-2 bg-gradient-to-r from-blood-800 to-blood-950 hover:from-blood-700 hover:to-blood-900 text-red-100 text-sm font-bold rounded-lg transition-all shadow-lg border-2 border-blood-600 hover:shadow-blood-700/50"
        >
          💀 Cleanse History
        </button>
      </div>
      <div className="space-y-3 relative z-10">
        {history.map((entry, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-purple-950 to-black rounded-lg p-4 border-2 border-blood-800 hover:border-blood-600 transition-colors shadow-lg relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blood-900/20 via-transparent to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="font-bold text-blood-400 text-lg">
                  {entry.winner.name}
                </div>
                <div className="text-sm text-purple-300">
                  ID: {entry.winner.id} • {entry.winner.companyname}
                </div>
              </div>
              <div className="text-xs text-red-400">
                {formatTimestamp(entry.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
