'use client';

import { useState, useMemo } from 'react';
import type { Participant } from '@/lib/types';

type ParticipantsPanelProps = {
  participants: Participant[];
};

export default function ParticipantsPanel({ participants }: ParticipantsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayLimit, setDisplayLimit] = useState(100);

  const { filteredParticipants, totalFiltered } = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    // If searching, show all filtered results
    if (term) {
      const filtered = participants.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.id.toLowerCase().includes(term) ||
          p.companyname.toLowerCase().includes(term)
      );
      return {
        filteredParticipants: filtered,
        totalFiltered: filtered.length
      };
    }

    // If not searching, apply display limit
    return {
      filteredParticipants: participants.slice(0, displayLimit),
      totalFiltered: participants.length
    };
  }, [participants, searchTerm, displayLimit]);

  const hasMore = !searchTerm && displayLimit < participants.length;

  const handleLoadMore = () => {
    setDisplayLimit(prev => Math.min(prev + 100, participants.length));
  };

  const handleShowAll = () => {
    setDisplayLimit(participants.length);
  };

  return (
    <div className="bg-gradient-to-br from-black/30 to-purple-950/30 rounded-lg shadow-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blood-900/10 to-transparent pointer-events-none"></div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left bg-gradient-to-r from-purple-950 to-black hover:from-purple-900 hover:to-purple-950 transition-colors flex justify-between items-center relative z-10 group"
      >
        <span className="font-horror font-bold text-blood-500 text-lg text-eerie-glow">
          🕷️ The Victim Registry ({participants.length})
        </span>
        <span className="text-blood-500 text-xl group-hover:animate-pulse">
          {isOpen ? '▼' : '▶'}
        </span>
      </button>

      {isOpen && (
        <div className="p-6 relative z-10">
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 Search the list of the damned..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-purple-950 border-2 border-blood-700 text-red-200 placeholder-red-400/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blood-600 focus:border-blood-600 font-medium shadow-lg"
            />
          </div>

          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-red-300 font-semibold">
              Showing {filteredParticipants.length} of {totalFiltered} souls
              {searchTerm && ' (filtered)'}
            </div>
            {hasMore && (
              <div className="flex gap-2">
                <button
                  onClick={handleLoadMore}
                  className="px-3 py-1 text-xs bg-purple-900 hover:bg-purple-800 text-red-300 font-bold rounded transition-colors border border-blood-700"
                >
                  Load 100 More
                </button>
                <button
                  onClick={handleShowAll}
                  className="px-3 py-1 text-xs bg-gradient-to-r from-blood-800 to-blood-900 hover:from-blood-700 hover:to-blood-800 text-red-100 font-bold rounded transition-colors"
                >
                  Show All
                </button>
              </div>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-purple-950 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blood-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blood-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-blood-400 uppercase tracking-wider">
                    Company
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900">
                {filteredParticipants.map((participant) => (
                  <tr
                    key={participant.id}
                    className="hover:bg-purple-950/70 transition-colors group"
                  >
                    <td className="px-4 py-2 text-sm text-blood-400 font-semibold group-hover:text-blood-300">
                      {participant.id}
                    </td>
                    <td className="px-4 py-2 text-sm text-red-200 font-medium group-hover:text-red-100">
                      {participant.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-purple-300 group-hover:text-purple-200">
                      {participant.companyname}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="mt-4 text-center">
              <button
                onClick={handleShowAll}
                className="px-6 py-3 bg-gradient-to-r from-blood-800 to-blood-900 hover:from-blood-700 hover:to-blood-800 text-red-100 font-bold rounded-lg transition-all shadow-xl border-2 border-blood-700 hover:shadow-blood-700/50"
              >
                Reveal All {participants.length} Souls
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
