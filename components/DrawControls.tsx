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
        className="px-16 py-4 bg-gradient-to-r from-blood-700 to-blood-900 hover:from-blood-800 hover:to-blood-950 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold rounded-lg shadow-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed text-2xl hover:shadow-blood-700/50 hover:shadow-2xl relative overflow-hidden group min-w-[300px]"
        style={{
          textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.9), -2px -2px 4px rgba(0, 0, 0, 0.9)',
        }}
      >
        <span className="relative z-10 tracking-wider" style={{ fontFamily: 'Creepster, cursive' }}>
          {state === 'shuffling' ? '⚰️ Summoning...' : '🦇 Begin the Ritual'}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blood-600/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </button>
    </div>
  );
}
