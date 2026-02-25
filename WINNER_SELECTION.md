# Winner Selection — How It Works

## Overview

The DMS Midnight 13th raffle draw uses a **cryptographically secure random selection** process to ensure every participant has a fair and equal chance of being chosen. No participant can be selected twice within the same session.

---

## Participant Pool

- All participants are loaded from a static data file (`data/participants.json`).
- The pool contains **1,200 registered participants**, each identified by:
  - **ID** — a unique participant number
  - **Name** — full name
  - **Location** — company / department

---

## Eligibility Rule — No Repeat Winners

Before each draw, the system builds an **eligible pool** by filtering out anyone who has already won in the current session:

```
eligibleParticipants = allParticipants.filter(
  p => not in drawHistory
)
```

Once a participant wins, they are permanently excluded from all subsequent draws **until the history is manually cleared**.

---

## Random Selection Method

The winner is selected using the **Web Crypto API** (`crypto.getRandomValues`), which is built into all modern browsers.

### Why Web Crypto API?

| Method | Source | Suitable for draws? |
|---|---|---|
| `Math.random()` | Pseudo-random (predictable) | No |
| `crypto.getRandomValues()` | OS-level entropy (unpredictable) | **Yes** |

The Web Crypto API draws entropy from the operating system's secure random number generator, making the result **statistically unbiased and non-reproducible**.

### Selection Steps

1. A single `Uint32Array(1)` is filled with a cryptographically random 32-bit unsigned integer.
2. That integer is taken modulo the size of the eligible pool to produce a valid index.
3. The participant at that index is selected as the winner.

```
randomBytes = crypto.getRandomValues(new Uint32Array(1))
winnerIndex  = randomBytes[0] % eligiblePool.length
winner       = eligiblePool[winnerIndex]
```

---

## Draw Sequence (Timeline)

| Time | Event |
|---|---|
| 0 s | Operator clicks **"Begin the Ritual"** |
| 0 s | Thunder sound plays; shuffle animation starts |
| 0.5 s | Background music begins |
| 0 – 8 s | Display rapidly cycles through random names (visual effect only — not the selection) |
| 8 s | Music stops; `crypto.getRandomValues` is called **once** to pick the final winner |
| 8 s | Winner is revealed and added to the draw history |

> **Important:** The names shown during the 8-second shuffle animation are purely cosmetic. They are drawn from a separate high-frequency random loop (every 50 ms) for visual effect. The **actual winner is determined by a single call at the 8-second mark**, completely independently of the animation.

---

## Fairness Guarantees

- Every eligible participant has an **equal probability** of `1 / eligibleCount` of being selected.
- The selection is performed **client-side in the browser** with no server involvement, eliminating network-based manipulation.
- The Web Crypto API is **non-deterministic** — the same draw cannot be replicated or predicted in advance.
- Previous winners are **automatically excluded** per session, ensuring no duplicate prizes.

---

## Resetting the Draw

The **"Cleanse History"** button clears all previous winners, making the full pool of 1,200 participants eligible again for the next draw.

---

*This document describes the winner selection logic as implemented in `lib/random.ts` and `app/page.tsx`.*
