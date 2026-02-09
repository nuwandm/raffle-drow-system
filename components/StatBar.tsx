import type { Participant } from '@/lib/types';

type StatBarProps = {
  participants: Participant[];
};

export default function StatBar({ participants }: StatBarProps) {
  return (
    <div className="bg-gradient-to-br from-black to-purple-950 rounded-lg shadow-xl p-6 mb-4 border-2 border-blood-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blood-900/20 via-transparent to-purple-900/20 animate-pulse"></div>
      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="text-center">
          <div className="text-5xl font-bold text-blood-500 text-eerie-glow">
            {participants.length}
          </div>
          <div className="text-sm text-red-300 mt-1 font-semibold tracking-wide">Potential Victims</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-purple-400 animate-pulse">
            ☠️
          </div>
          <div className="text-sm text-purple-300 mt-1 font-semibold tracking-wide">Awaiting Fate</div>
        </div>
      </div>
    </div>
  );
}
