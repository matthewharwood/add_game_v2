/**
 * Simple Audio Controller - handles sound effects
 * Reusable, clean, performant
 */
export class AudioController {
  constructor() {
    this.sounds = new Map();
    this.activeAudio = null;
  }

  /**
   * Preload a sound for instant playback
   * @param {string} name - Sound identifier
   * @param {string} src - Path to audio file
   */
  load(name, src) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    this.sounds.set(name, src);
  }

  /**
   * Play a sound, cancelling any currently playing instance
   * @param {string} name - Sound identifier to play
   * @param {number} volume - Volume level (0-1)
   */
  play(name, volume = 1.0) {
    const src = this.sounds.get(name);
    if (!src) {
      console.warn(`Sound '${name}' not loaded`);
      return;
    }

    // Cancel current audio if playing
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
    }

    // Create new audio instance for overlapping sounds
    this.activeAudio = new Audio(src);
    this.activeAudio.volume = volume;
    
    // Play and handle errors
    this.activeAudio.play().catch(err => {
      console.warn('Audio playback failed:', err);
    });

    // Clean up reference when done
    this.activeAudio.addEventListener('ended', () => {
      this.activeAudio = null;
    });
  }

  /**
   * Stop all sounds
   */
  stop() {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
  }

  /**
   * Set up click sounds for elements
   * @param {HTMLElement} container - Container to listen for clicks
   * @param {string} selector - Selector for clickable elements
   * @param {string} soundName - Sound to play on click
   */
  setupClickSound(container, selector, soundName) {
    container.addEventListener('click', (e) => {
      const target = e.target.closest(selector);
      if (target && !target.hasAttribute('disabled')) {
        this.play(soundName);
      }
    });
  }
}

// Export singleton instance for convenience
export const audioController = new AudioController();