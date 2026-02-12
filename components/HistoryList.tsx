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
    <div className="bg-black/30 rounded-lg shadow-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-horror font-bold text-blood-500">
          ⚰️ The Fallen Ones ({history.length})
        </h2>
        <button
          onClick={onClear}
          className="px-5 py-2 bg-gradient-to-r from-blood-800 to-blood-950 hover:from-blood-700 hover:to-blood-900 text-red-100 text-sm font-bold rounded-lg transition-colors shadow-lg"
        >
          💀 Cleanse History
        </button>
      </div>
      <div className="space-y-3">
        {history.map((entry, index) => (
          <div
            key={index}
            className="bg-purple-950/25 rounded-lg p-4 shadow-lg"
          >
            <div className="flex justify-between items-start">
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
