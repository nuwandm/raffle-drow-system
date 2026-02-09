"use client";

import { useState, useEffect, useRef } from "react";
import type { Participant, DrawHistoryEntry, DrawState } from "@/lib/types";
import { cryptoRandomInt, cryptoRandomElement } from "@/lib/random";
import StatBar from "@/components/StatBar";
import WinnerCard from "@/components/WinnerCard";
import DrawControls from "@/components/DrawControls";
import HistoryList from "@/components/HistoryList";
import ParticipantsPanel from "@/components/ParticipantsPanel";

// Import participants data
import participantsData from "@/data/participants.json";

export default function Home() {
  const [participants] = useState<Participant[]>(participantsData);
  const [state, setState] = useState<DrawState>("idle");
  const [currentDisplay, setCurrentDisplay] = useState<Participant | null>(
    null,
  );
  const [winner, setWinner] = useState<Participant | null>(null);
  const [history, setHistory] = useState<DrawHistoryEntry[]>([]);

  const shuffleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current);
      }
    };
  }, []);

  const handleDraw = () => {
    if (state === "shuffling" || participants.length === 0) return;

    // Filter out previous winners from eligible participants
    const eligibleParticipants = participants.filter(
      (p) => !history.some((h) => h.winner.id === p.id),
    );

    // Check if all participants have already won
    if (eligibleParticipants.length === 0) {
      alert(
        "All participants have already won! Please clear history to draw again.",
      );
      return;
    }

    // Start shuffling
    setState("shuffling");
    setWinner(null);

    // Shuffle animation: rapidly change displayed participant (from eligible pool only)
    shuffleIntervalRef.current = setInterval(() => {
      const randomIndex = cryptoRandomInt(eligibleParticipants.length);
      console.log("random index", randomIndex);
      setCurrentDisplay(eligibleParticipants[randomIndex]);
    }, 50);

    // After 5 seconds, stop shuffling and reveal winner
    setTimeout(() => {
      if (shuffleIntervalRef.current) {
        clearInterval(shuffleIntervalRef.current);
        shuffleIntervalRef.current = null;
      }

      // Pick final winner using crypto randomness (from eligible pool only)
      const finalWinner = cryptoRandomElement(eligibleParticipants);
      console.log("final winner", finalWinner);
      if (finalWinner) {
        setWinner(finalWinner);
        setState("revealed");

        // Add to history
        const entry: DrawHistoryEntry = {
          timestamp: new Date().toISOString(),
          winner: finalWinner,
        };
        setHistory((prev) => [entry, ...prev]);
      } else {
        setState("idle");
      }
    }, 5000);
  };

  const handleReset = () => {
    if (shuffleIntervalRef.current) {
      clearInterval(shuffleIntervalRef.current);
      shuffleIntervalRef.current = null;
    }

    setState("idle");
    setCurrentDisplay(null);
    setWinner(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/assets/moon-video-background.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric particles */}
      <div className="background-particles"></div>

      {/* Jason Image - Bottom Left */}
      <img src="/assets/jason.png" alt="Jason" className="jason-image" />

      {/* Animated bats */}
      <div
        className="bat"
        style={{ top: "10%", left: "10%", animationDelay: "0s" }}
      ></div>
      <div
        className="bat"
        style={{ top: "20%", left: "70%", animationDelay: "2s" }}
      ></div>
      <div
        className="bat"
        style={{ top: "60%", left: "30%", animationDelay: "4s" }}
      ></div>

      <div className="max-w-5xl mx-auto px-4 py-6 bg-gradient-to-br from-black/30 via-purple-950/30 to-black/30 backdrop-blur-sm shadow-2xl rounded-2xl my-4 relative z-10">
        {/* Header */}
        <header className="text-center mb-6 relative">
          <h1 className="text-6xl font-horror font-bold text-blood-600 mb-2 drop-shadow-lg text-eerie-glow">
            🦇 DMS MIDNIGHT 13<sup className="text-4xl">TH</sup> 🦇
          </h1>
          <div className="relative inline-block">
            <p className="text-xl text-red-300 font-semibold text-flicker tracking-wider">
              ☠️ The Chosen Ones Await Their Fate ☠️
            </p>
          </div>
        </header>

        {/* Stats */}
        <StatBar participants={participants} />

        {/* Winner Display */}
        <WinnerCard
          state={state}
          currentDisplay={currentDisplay}
          winner={winner}
        />

        {/* Controls */}
        <DrawControls state={state} onDraw={handleDraw} onReset={handleReset} />

        {/* History */}
        <HistoryList history={history} onClear={handleClearHistory} />

        {/* Participants Panel */}
        <ParticipantsPanel participants={participants} />
      </div>
    </div>
  );
}
