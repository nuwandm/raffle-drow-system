/**
 * Generate a crowd clapping/applause sound using Web Audio API
 * Simulates audience applause without needing external files
 */
export function playCelebrationSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioContext.currentTime;

    // Function to create a single clap sound
    const createClap = (startTime: number, volume: number = 0.15) => {
      // Use white noise for clap
      const bufferSize = audioContext.sampleRate * 0.05; // 50ms
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioContext.createBufferSource();
      noise.buffer = buffer;

      // Filter to make it sound more like a clap
      const filter = audioContext.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1500;
      filter.Q.value = 1;

      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(volume, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      noise.start(startTime);
      noise.stop(startTime + 0.05);
    };

    // Create crowd applause effect with multiple claps
    // Start sparse, build to dense applause, then fade
    const totalDuration = 3; // 3 seconds of applause
    const clapCounts = [5, 15, 25, 30, 25, 20, 15]; // Claps per segment
    const segmentDuration = totalDuration / clapCounts.length;

    clapCounts.forEach((count, segment) => {
      for (let i = 0; i < count; i++) {
        const time = now + segment * segmentDuration + Math.random() * segmentDuration;
        const volume = 0.1 + Math.random() * 0.15; // Varying volumes for realism
        createClap(time, volume);
      }
    });

    // Add some "woohoo" effect with oscillators
    const createCheer = (startTime: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(300, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, startTime + 0.3);
      oscillator.type = 'triangle';

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.3);
    };

    // Add 3-4 cheers during peak applause
    createCheer(now + 1.0);
    createCheer(now + 1.5);
    createCheer(now + 2.0);

    console.log('👏 Playing crowd applause!');
  } catch (error) {
    console.log('Web Audio API not available:', error);
  }
}
