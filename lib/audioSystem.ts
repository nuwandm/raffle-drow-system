/**
 * Horror-themed Audio System for Raffle Draw
 * Plays MP3 files at different stages of the draw
 */

export class AudioSystem {
  private audioContext: AudioContext | null = null;
  private backgroundMusic: HTMLAudioElement | null = null;
  private thunderSound: HTMLAudioElement | null = null;
  private winnerSound: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Initialize all audio files
   * Call this once when component mounts
   */
  initAudio(basePath: string = '') {
    // Background music during drawing (suspenseful horror theme)
    this.backgroundMusic = new Audio(`${basePath}/assets/audio/drawing-background.mp3`);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.4; // Adjust volume as needed

    // Thunder/lightning sound effect
    this.thunderSound = new Audio(`${basePath}/assets/audio/thunder.mp3`);
    this.thunderSound.volume = 0.6;

    // Winner celebration sound
    this.winnerSound = new Audio(`${basePath}/assets/audio/winner-celebration.mp3`);
    this.winnerSound.volume = 0.7;

    // Preload audio files
    this.backgroundMusic.load();
    this.thunderSound.load();
    this.winnerSound.load();

    console.log('🎵 Audio system initialized');
  }

  /**
   * Play background music during raffle drawing
   */
  playDrawingMusic() {
    try {
      if (this.backgroundMusic) {
        this.backgroundMusic.currentTime = 0;
        this.backgroundMusic.play().catch(err => {
          console.log('Background music play prevented:', err);
        });
        console.log('🎵 Playing drawing background music');
      }
    } catch (error) {
      console.error('Error playing background music:', error);
    }
  }

  /**
   * Stop background music
   */
  stopDrawingMusic() {
    try {
      if (this.backgroundMusic) {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        console.log('🎵 Stopped drawing music');
      }
    } catch (error) {
      console.error('Error stopping background music:', error);
    }
  }

  /**
   * Play thunder/lightning sound effect
   */
  playThunder() {
    try {
      if (this.thunderSound) {
        this.thunderSound.currentTime = 0;
        this.thunderSound.play().catch(err => {
          console.log('Thunder sound play prevented:', err);
        });
        console.log('⚡ Playing thunder sound');
      }
    } catch (error) {
      console.error('Error playing thunder sound:', error);
    }
  }

  /**
   * Play winner celebration sound
   */
  playWinnerCelebration() {
    try {
      if (this.winnerSound) {
        this.winnerSound.currentTime = 0;
        this.winnerSound.play().catch(err => {
          console.log('Winner sound play prevented:', err);
        });
        console.log('🎉 Playing winner celebration');
      }
    } catch (error) {
      console.error('Error playing winner sound:', error);
    }
  }

  /**
   * Stop all sounds
   */
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
    console.log('🔇 Stopped all sounds');
  }

  /**
   * Clean up audio resources
   */
  cleanup() {
    this.stopAllSounds();
    this.backgroundMusic = null;
    this.thunderSound = null;
    this.winnerSound = null;
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Create singleton instance
let audioSystemInstance: AudioSystem | null = null;

export function getAudioSystem(): AudioSystem {
  if (!audioSystemInstance) {
    audioSystemInstance = new AudioSystem();
  }
  return audioSystemInstance;
}
