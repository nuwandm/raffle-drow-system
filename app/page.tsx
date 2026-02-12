"use client";

import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import type { Participant, DrawHistoryEntry, DrawState } from "@/lib/types";
import { cryptoRandomElement } from "@/lib/random";
import { getAssetPath, BASE_PATH } from "@/lib/basePath";
import { getAudioSystem } from "@/lib/audioSystem";
import StatBarBase from "@/components/StatBar";
import WinnerCard from "@/components/WinnerCard";
import DrawControlsBase from "@/components/DrawControls";
import HistoryListBase from "@/components/HistoryList";

// Import participants data
import participantsData from "@/data/participants.json";

// Memoize child components to prevent re-renders during shuffle animation
const StatBar = memo(StatBarBase);
const DrawControls = memo(DrawControlsBase);
const HistoryList = memo(HistoryListBase);

export default function Home() {
  const [participants] = useState<Participant[]>(participantsData);
  const [state, setState] = useState<DrawState>("idle");
  const [winner, setWinner] = useState<Participant | null>(null);
  const [history, setHistory] = useState<DrawHistoryEntry[]>([]);

  const stopTimerRef = useRef<NodeJS.Timeout | null>(null);
  const audioSystemRef = useRef(getAudioSystem());

  // Eligible participants (excluding previous winners) — stable reference via useMemo
  const eligibleParticipants = useMemo(
    () => participants.filter((p) => !history.some((h) => h.winner.id === p.id)),
    [participants, history],
  );

  // Initialize audio system and cleanup on unmount
  useEffect(() => {
    const audioSystem = audioSystemRef.current;
    audioSystem.initAudio(BASE_PATH);

    return () => {
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
      audioSystem.cleanup();
    };
  }, []);

  const handleDraw = useCallback(() => {
    if (state === "shuffling" || participants.length === 0) return;

    if (eligibleParticipants.length === 0) {
      alert(
        "All participants have already won! Please clear history to draw again.",
      );
      return;
    }

    const audioSystem = audioSystemRef.current;

    // Play thunder sound at the start for dramatic effect
    audioSystem.playThunder();

    // Start shuffling — WinnerCard handles the animation via direct DOM writes
    setState("shuffling");
    setWinner(null);

    // Play background music during drawing
    setTimeout(() => {
      audioSystem.playDrawingMusic();
    }, 500);

    // After 5 seconds, stop shuffling and reveal winner
    stopTimerRef.current = setTimeout(() => {
      // Stop background music
      audioSystem.stopDrawingMusic();

      // Pick final winner using crypto randomness
      const finalWinner = cryptoRandomElement(eligibleParticipants);
      if (finalWinner) {
        setWinner(finalWinner);
        setState("revealed");

        audioSystem.playWinnerCelebration();

        const entry: DrawHistoryEntry = {
          timestamp: new Date().toISOString(),
          winner: finalWinner,
        };
        setHistory((prev) => [entry, ...prev]);
      } else {
        setState("idle");
      }
    }, 5000);
  }, [state, participants, eligibleParticipants]);

  const handleReset = useCallback(() => {
    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }

    const audioSystem = audioSystemRef.current;
    audioSystem.stopAllSounds();

    setState("idle");
    setWinner(null);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Static Image Background */}
      <img
        src={getAssetPath("/assets/moon-background.png")}
        alt=""
        className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
      />

      {/* Jason Image - Bottom Left (static, no animation/filter) */}
      <img
        src={getAssetPath("/assets/jason.png")}
        alt="Jason"
        className="jason-image"
      />

      <div className="max-w-5xl mx-auto px-4 py-6 bg-black/40 shadow-2xl rounded-2xl my-4 relative z-10">
        {/* Header */}
        <header className="text-center mb-6 relative">
          <h1 className="text-6xl font-horror font-bold text-blood-600 mb-2 drop-shadow-lg">
            🦇 DMS MIDNIGHT 13<sup className="text-4xl">TH</sup> 🦇
          </h1>
          <div className="relative inline-block">
            <p className="text-xl text-red-300 font-semibold tracking-wider">
              ☠️ The Chosen Ones Await Their Fate ☠️
            </p>
          </div>
        </header>

        {/* Stats */}
        <StatBar participants={participants} />

        {/* Winner Display */}
        <WinnerCard
          state={state}
          shufflePool={eligibleParticipants}
          winner={winner}
        />

        {/* Controls */}
        <DrawControls state={state} onDraw={handleDraw} onReset={handleReset} />

        {/* History */}
        <HistoryList history={history} onClear={handleClearHistory} />
      </div>
    </div>
  );
}
