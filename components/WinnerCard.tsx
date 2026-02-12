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
  const rafRef = useRef<number | null>(null);

  // Run shuffle animation via direct DOM writes — no React re-renders
  useEffect(() => {
    if (state !== 'shuffling' || shufflePool.length === 0) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const batchSize = 512;
    const randomBatch = new Uint32Array(batchSize);
    let batchIndex = batchSize;

    const animate = () => {
      if (batchIndex >= batchSize) {
        crypto.getRandomValues(randomBatch);
        batchIndex = 0;
      }
      const idx = randomBatch[batchIndex++] % shufflePool.length;
      const p = shufflePool[idx];

      if (nameRef.current) nameRef.current.textContent = p.name;
      if (companyRef.current) companyRef.current.textContent = p.companyname;

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
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
      <div className="bg-gradient-to-br from-purple-950/25 to-black/25 rounded-xl shadow-lg p-8 mb-4 text-center relative overflow-hidden">
        <div className="text-red-300 text-lg font-semibold relative z-10">
          🦇 Click "Begin the Ritual" to choose a victim... 🦇
        </div>
      </div>
    );
  }

  if (state === 'shuffling') {
    return (
      <div className="bg-gradient-to-br from-black/30 to-purple-950/30 rounded-xl shadow-2xl p-8 mb-4 text-center relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-sm text-blood-500 font-bold mb-3 uppercase tracking-widest font-horror">
            ⚰️ Choosing the Next Victim... ⚰️
          </div>
          <div ref={nameRef} className="text-5xl font-bold text-red-300 mb-2">
            &nbsp;
          </div>
          <div ref={companyRef} className="text-xl text-purple-300 mt-1">
            &nbsp;
          </div>
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
            {/* Flying bats */}
            {[...Array(15)].map((_, i) => (
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

            {/* Falling ghost wisps */}
            {[...Array(60)].map((_, i) => (
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
          {/* Blood Drips Effect */}
          {showEffects && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(30)].map((_, i) => (
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

          {/* Victim Card */}
          <div className="bg-gradient-to-br from-black/35 via-purple-950/35 to-blood-950/35 rounded-xl shadow-2xl p-6 text-center relative overflow-hidden animate-winner-reveal">
            <div className="text-3xl mb-2">
              🦇 ⚰️ 🦇
            </div>

            <div className="text-3xl text-blood-500 font-horror font-bold mb-2 uppercase tracking-wide drop-shadow-lg">
              ☠️ THE CHOSEN ONE ☠️
            </div>

            <div className="text-base text-red-300 font-semibold mb-4 uppercase tracking-widest">
              Your Fate Has Been Sealed...
            </div>

            <div className="relative bg-gradient-to-br from-blood-900/30 to-purple-950/30 rounded-lg p-6 mb-3 shadow-xl">
              <div className="relative z-10">
                <div className="text-5xl font-bold text-red-200 mb-2 drop-shadow-lg">
                  {winner.name}
                </div>
                <div className="text-xl text-purple-300 font-medium mt-2">
                  {winner.companyname}
                </div>
              </div>
            </div>

            <div className="text-3xl mt-2">
              🕷️ 💀 🕷️
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
