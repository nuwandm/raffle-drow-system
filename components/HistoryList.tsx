import type { DrawHistoryEntry } from '@/lib/types';
import { formatTimestamp } from '@/lib/format';

const HORROR_FONT = { fontFamily: "'MedievalSharp', cursive" };

type HistoryListProps = {
  history: DrawHistoryEntry[];
  onClear: () => void;
};

export default function HistoryList({ history, onClear }: HistoryListProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-black/30 rounded-lg shadow-xl p-8 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blood-500" style={HORROR_FONT}>
          ⚰️ The Fallen Ones ({history.length})
        </h2>
        <button
          onClick={onClear}
          className="px-5 py-2 bg-gradient-to-r from-blood-800 to-blood-950 hover:from-blood-700 hover:to-blood-900 text-red-100 text-sm font-bold rounded-lg transition-colors shadow-lg"
          style={HORROR_FONT}
        >
          💀 Cleanse History
        </button>
      </div>
      <div className="space-y-4">
        {history.map((entry, index) => (
          <div
            key={index}
            className="bg-purple-950/25 rounded-lg p-5 shadow-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-red-300 text-lg" style={HORROR_FONT}>
                  {entry.winner.name}
                </div>
                <div className="text-sm text-purple-100" style={HORROR_FONT}>
                  {entry.winner.location}
                </div>
                <div className="text-xs text-red-200 uppercase tracking-[0.1em] mt-1" style={HORROR_FONT}>
                  Victim No: <span className="text-white font-bold">{entry.winner.id}</span>
                </div>
              </div>
              <div className="text-xs text-red-200" style={HORROR_FONT}>
                {formatTimestamp(entry.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
