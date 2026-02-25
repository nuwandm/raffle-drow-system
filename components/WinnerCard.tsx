'use client';

import { useEffect, useState, useRef } from 'react';
import type { Participant, DrawState } from '@/lib/types';

type WinnerCardProps = {
  state: DrawState;
  shufflePool: Participant[];
  winner: Participant | null;
};

export default function WinnerCard({ state, shufflePool, winner }: WinnerCardProps) {
  const [showEffects, setShowEffects] = useState(false);

  // DOM refs for direct manipulation during shuffle (bypasses React render cycle)
  const nameRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Run shuffle animation via direct DOM writes — no React re-renders
  useEffect(() => {
    if (state !== 'shuffling' || shufflePool.length === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const batchSize = 512;
    const randomBatch = new Uint32Array(batchSize);
    let batchIndex = batchSize;

    timerRef.current = setInterval(() => {
      if (batchIndex >= batchSize) {
        crypto.getRandomValues(randomBatch);
        batchIndex = 0;
      }
      const idx = randomBatch[batchIndex++] % shufflePool.length;
      const p = shufflePool[idx];

      if (nameRef.current) nameRef.current.textContent = p.name;
      if (companyRef.current) companyRef.current.textContent = p.location;
    }, 50);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [state, shufflePool]);

  // Winner celebration effects
  useEffect(() => {
    if (state === 'revealed' && winner) {
      setShowEffects(true);

      const timer = setTimeout(() => {
        setShowEffects(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [state, winner]);

  if (state === 'idle' && !winner) {
    return (
      <div className="border border-blood-900/30 rounded-2xl p-10 mb-4 text-center bg-black/20">
        <div className="text-red-400/80 text-lg tracking-wide" style={{ fontFamily: 'Creepster, cursive' }}>
          Click &quot;Begin the Ritual&quot; to choose a victim...
        </div>
      </div>
    );
  }

  if (state === 'shuffling') {
    return (
      <div className="border border-blood-900/40 rounded-2xl p-10 mb-4 text-center bg-black/30">
        <div
          className="text-xs text-blood-500 font-bold mb-4 uppercase tracking-[0.3em]"
          style={{ fontFamily: 'Creepster, cursive' }}
        >
          Summoning the Next Victim...
        </div>
        <div ref={nameRef} className="text-5xl font-bold text-white mb-2">
          &nbsp;
        </div>
        <div ref={companyRef} className="text-lg text-white mt-1">
          &nbsp;
        </div>
      </div>
    );
  }

  if ((state === 'revealed' || state === 'idle') && winner) {
    return (
      <>
        {/* Full Screen Celebration Overlay */}
        {showEffects && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={`bat-${i}`}
                className="bat-celebrate"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}
            {[...Array(50)].map((_, i) => (
              <div
                key={`wisp-${i}`}
                className="wisp"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative mb-4">
          {/* Blood Drips */}
          {showEffects && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="blood-drip"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Winner Card */}
          <div className="animate-winner-reveal rounded-2xl overflow-hidden border border-blood-800/50 bg-gradient-to-b from-black/60 via-blood-950/20 to-black/60">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-blood-600 to-transparent" />

            <div className="px-8 pt-8 pb-6 text-center">
              {/* Title section */}
              <div
                className="text-sm text-red-300 uppercase tracking-[0.5em] mb-1"
                style={{
                  fontFamily: 'Creepster, cursive',
                  textShadow: '0 0 8px rgba(239,68,68,0.7)',
                }}
              >
                The Ritual Has Spoken
              </div>
              <div
                className="text-4xl font-bold uppercase tracking-[0.3em] mb-6"
                style={{
                  fontFamily: 'Creepster, cursive',
                  color: '#DC2626',
                  textShadow: '0 0 16px rgba(220,38,38,0.9), 0 0 32px rgba(185,28,28,0.6)',
                }}
              >
                The Chosen One
              </div>

              {/* Divider */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-blood-700/60" />
                <span className="text-blood-600 text-lg">☠️</span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blood-700/60" />
              </div>

              {/* Winner name block */}
              <div className="bg-black/40 rounded-xl px-8 py-8 border border-blood-900/30 mb-6">
                <div className="text-5xl font-bold text-white mb-3 text-bordered tracking-[0.1em]" style={{ fontFamily: 'Creepster, cursive' }}>
                  {winner.name}
                </div>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-3" />
                <div className="text-lg text-purple-300 font-medium tracking-wide text-bordered">
                  {winner.location}
                </div>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mt-3 mb-3" />
                <div className="text-sm text-red-400 uppercase tracking-[0.2em]">
                  Victim No: <span className="text-red-300 font-bold">{winner.id}</span>
                </div>
              </div>

              {/* Bottom tagline */}
              <div
                className="text-sm text-red-300 uppercase tracking-[0.2em]"
                style={{ textShadow: '0 0 6px rgba(239,68,68,0.5)' }}
              >
                Your Fate Has Been Sealed
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-purple-700/60 to-transparent" />
          </div>
        </div>
      </>
    );
  }

  return null;
}
