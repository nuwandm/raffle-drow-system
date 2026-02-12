/**
 * Horror-themed Audio System for Raffle Draw
 * Plays MP3 files only - no Web Audio API generation
 */

export class AudioSystem {
  private backgroundMusic: HTMLAudioElement | null = null;
  private thunderSound: HTMLAudioElement | null = null;
  private winnerSound: HTMLAudioElement | null = null;

  initAudio(basePath: string = '') {
    this.backgroundMusic = new Audio(`${basePath}/assets/audio/drawing-background.mp3`);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.6;

    this.thunderSound = new Audio(`${basePath}/assets/audio/thunder.mp3`);
    this.thunderSound.volume = 0.4;

    this.winnerSound = new Audio(`${basePath}/assets/audio/winner-celebration.mp3`);
    this.winnerSound.volume = 0.7;

    this.backgroundMusic.load();
    this.thunderSound.load();
    this.winnerSound.load();
  }

  playDrawingMusic() {
    try {
      if (this.backgroundMusic) {
        this.backgroundMusic.currentTime = 0;
        this.backgroundMusic.play().catch(() => {});
      }
    } catch {}
  }

  stopDrawingMusic() {
    try {
      if (this.backgroundMusic) {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
      }
    } catch {}
  }

  playThunder() {
    try {
      if (this.thunderSound) {
        this.thunderSound.currentTime = 0;
        this.thunderSound.play().catch(() => {});
      }
    } catch {}
  }

  playWinnerCelebration() {
    try {
      if (this.winnerSound) {
        this.winnerSound.currentTime = 0;
        this.winnerSound.play().catch(() => {});
      }
    } catch {}
  }

  stopAllSounds() {
    this.stopDrawingMusic();
    if (this.thunderSound) {
      this.thunderSound.pause();
      this.thunderSound.currentTime = 0;
    }
    if (this.winnerSound) {
      this.winnerSound.pause();
      this.winnerSound.currentTime = 0;
    }
  }

  cleanup() {
    this.stopAllSounds();
    this.backgroundMusic = null;
    this.thunderSound = null;
    this.winnerSound = null;
  }
}

let audioSystemInstance: AudioSystem | null = null;

export function getAudioSystem(): AudioSystem {
  if (!audioSystemInstance) {
    audioSystemInstance = new AudioSystem();
  }
  return audioSystemInstance;
}
