'use client';

import { useEffect, useState } from 'react';
import type { Participant, DrawState } from '@/lib/types';

type WinnerCardProps = {
  state: DrawState;
  currentDisplay: Participant | null;
  winner: Participant | null;
};

export default function WinnerCard({ state, currentDisplay, winner }: WinnerCardProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    if (state === 'revealed' && winner) {
      setShowConfetti(true);
      setShowFireworks(true);

      // Celebration sound is now played via MP3 in page.tsx audioSystem

      // Hide effects after animation completes
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setShowFireworks(false);
      }, 6000);

      return () => {
        clearTimeout(timer);
        // Cancel speech if component unmounts
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [state, winner]);
  if (state === 'idle' && !winner) {
    return (
      <div className="bg-gradient-to-br from-purple-950/25 to-black/25 rounded-xl shadow-lg p-8 mb-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blood-900/20 to-transparent animate-pulse"></div>
        <div className="text-red-300 text-lg font-semibold relative z-10 text-flicker">
          🦇 Click "Begin the Ritual" to choose a victim... 🦇
        </div>
      </div>
    );
  }

  if (state === 'shuffling' && currentDisplay) {
    return (
      <div className="bg-gradient-to-br from-black/30 to-purple-950/30 rounded-xl shadow-2xl p-8 mb-4 text-center animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blood-900/30 via-purple-900/30 to-blood-900/30 animate-pulse"></div>
        <div className="relative z-10">
          <div className="text-sm text-blood-500 font-bold mb-3 uppercase tracking-widest text-flicker font-horror">
            ⚰️ Choosing the Next Victim... ⚰️
          </div>
          <div className="text-5xl font-bold text-red-300 mb-2 animate-creepy-shake">
            {currentDisplay.name}
          </div>
          <div className="text-xl text-blood-300 font-semibold">
            ID: {currentDisplay.id}
          </div>
          <div className="text-lg text-purple-300 mt-1">
            {currentDisplay.companyname}
          </div>
        </div>
      </div>
    );
  }

  if ((state === 'revealed' || state === 'idle') && winner) {
    return (
      <>
        {/* Full Screen Horror Overlay */}
        {showFireworks && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {/* Flying bats */}
            {[...Array(15)].map((_, i) => (
              <div
                key={`bat-${i}`}
                className="bat"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              />
            ))}

            {/* Falling ghost wisps */}
            {[...Array(80)].map((_, i) => (
              <div
                key={`wisp-${i}`}
                className="sparkle"
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
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              {[...Array(40)].map((_, i) => (
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
          {/* Horror Message */}
          <div className="text-3xl mb-2 animate-ghost-float">
            🦇 ⚰️ 🦇
          </div>

          <div className="text-3xl text-blood-500 font-horror font-bold mb-2 uppercase tracking-wide animate-pulse drop-shadow-lg text-eerie-glow">
            ☠️ THE CHOSEN ONE ☠️
          </div>

          <div className="text-base text-red-300 font-semibold mb-4 uppercase tracking-widest text-flicker">
            Your Fate Has Been Sealed...
          </div>

          {/* Victim Name with Animation */}
          <div className="relative bg-gradient-to-br from-blood-900/30 to-purple-950/30 rounded-lg p-6 mb-3 animate-scale-in shadow-xl shine-effect animate-winner-glow animate-pulse-scale">
            {/* Moonlight Rays Background */}
            <div className="light-rays pointer-events-none"></div>

            {/* Floating Blood Splatter Particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`blood-${i}`}
                className="star-particle"
                style={{
                  left: `${10 + i * 12}%`,
                  bottom: '0',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${2 + Math.random()}s`
                }}
              />
            ))}

            {/* Victim Content */}
            <div className="relative z-10">
              <div className="text-5xl font-bold text-red-200 mb-2 drop-shadow-lg animate-ghost-float text-drip">
                {winner.name}
              </div>
              <div className="text-xl text-purple-300 font-medium mt-2">
                {winner.companyname}
              </div>
            </div>
          </div>

          {/* Bottom Horror Icons */}
          <div className="text-3xl mt-2 animate-ghost-float">
            🕷️ 💀 🕷️
          </div>
        </div>
        </div>
      </>
    );
  }

  return null;
}
