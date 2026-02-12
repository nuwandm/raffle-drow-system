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
        className="px-16 py-4 bg-gradient-to-r from-blood-700 to-blood-900 hover:from-blood-600 hover:to-blood-800 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold rounded-xl shadow-xl transition-colors duration-200 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed text-2xl min-w-[300px] border border-blood-600/50 disabled:border-gray-700"
        style={{ fontFamily: 'Creepster, cursive' }}
      >
        <span className="tracking-wider font-horror">
          {state === 'shuffling' ? 'Summoning...' : 'Begin the Ritual'}
        </span>
      </button>
    </div>
  );
}
