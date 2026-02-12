import type { Participant } from '@/lib/types';

type StatBarProps = {
  participants: Participant[];
};

export default function StatBar({ participants }: StatBarProps) {
  return (
    <div className="bg-black/30 rounded-lg shadow-xl p-6 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-blood-500">
            {participants.length}
          </div>
          <div className="text-sm text-red-300 mt-1 font-semibold tracking-wide">Potential Victims</div>
        </div>
        <div className="text-center">
          <div className="text-5xl font-bold text-purple-400">
            ☠️
          </div>
          <div className="text-sm text-purple-300 mt-1 font-semibold tracking-wide">Awaiting Fate</div>
        </div>
      </div>
    </div>
  );
}
