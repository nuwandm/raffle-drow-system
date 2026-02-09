import type { DrawState } from '@/lib/types';

type DrawControlsProps = {
  state: DrawState;
  onDraw: () => void;
  onReset: () => void;
};

export default function DrawControls({ state, onDraw, onReset }: DrawControlsProps) {
  const isDisabled = state === 'shuffling';

  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={onDraw}
        disabled={isDisabled}
        className="px-16 py-4 bg-gradient-to-r from-blood-700 to-blood-900 hover:from-blood-800 hover:to-blood-950 disabled:bg-gray-800 disabled:text-gray-500 text-red-100 font-bold rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed text-lg hover:shadow-blood-700/50 hover:shadow-2xl relative overflow-hidden group min-w-[300px]"
      >
        <span className="relative z-10 font-horror">
          {state === 'shuffling' ? '⚰️ Summoning...' : '🦇 Begin the Ritual'}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blood-600/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
    </div>
  );
}
