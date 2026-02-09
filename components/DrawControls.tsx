import type { DrawState } from '@/lib/types';

type DrawControlsProps = {
  state: DrawState;
  onDraw: () => void;
  onReset: () => void;
};

export default function DrawControls({ state, onDraw, onReset }: DrawControlsProps) {
  const isDisabled = state === 'shuffling';

  return (
    <div className="flex gap-4 justify-center mb-4">
      <button
        onClick={onDraw}
        disabled={isDisabled}
        className="px-8 py-4 bg-gradient-to-r from-blood-700 to-blood-900 hover:from-blood-800 hover:to-blood-950 disabled:bg-gray-800 disabled:text-gray-500 text-red-100 font-bold rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed text-lg border-2 border-blood-600 hover:shadow-blood-700/50 hover:shadow-2xl relative overflow-hidden group"
      >
        <span className="relative z-10 font-horror">
          {state === 'shuffling' ? '⚰️ Summoning...' : '🦇 Begin the Ritual'}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blood-600/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>

      {state === 'revealed' && (
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-purple-900 to-purple-950 hover:from-purple-800 hover:to-purple-900 text-purple-100 font-bold rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 text-lg border-2 border-purple-700 hover:shadow-purple-700/50 hover:shadow-2xl relative overflow-hidden group"
        >
          <span className="relative z-10 font-horror">
            🔮 Reset Ritual
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      )}
    </div>
  );
}
