/**
 * Audio Service
 * Handles all audio generation and playback using Web Audio API
 * Low-latency sound generation for harmonium-like experience
 */

import { AUDIO_CONFIG, WAVEFORM_TYPES } from '../constants/musicNotes';

// helper: create a periodic wave with harmonic content similar to reed instrument
function createReedWave(audioCtx) {
  // typical harmonium has strong fundamental and odd harmonics
  const real = new Float32Array([0, 1, 0.5, 0.3, 0.2, 0.1]);
  const imag = new Float32Array(real.length); // all zero for purely real coefficients
  return audioCtx.createPeriodicWave(real, imag, { disableNormalization: false });
}


class AudioService {
  constructor() {
    this.audioContext = null;
    this.oscillators = new Map(); // Map to store active oscillators
    this.gainNodes = new Map(); // Map to store gain nodes
    this.isInitialized = false;
    this.masterVolume = 0.3; // Default volume (30%)
    this.waveformType = WAVEFORM_TYPES.REED; // default to reed tone
    this.sustainMode = false;
    this.recording = [];
    this.isRecording = false;
    this.recordingStartTime = 0;
    this.reedWave = null; // cached periodic wave
  }

  /**
   * Initialize audio context on first user interaction
   */
  initialize() {
    if (this.isInitialized) return;

    try {
      const audioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new audioContextClass({
        latencyHint: 'interactive',
        sampleRate: AUDIO_CONFIG.SAMPLE_RATE,
      });
      this.isInitialized = true;
      
      // Create master gain node
      if (!this.masterGainNode) {
        this.masterGainNode = this.audioContext.createGain();
        this.masterGainNode.gain.value = this.masterVolume;
        this.masterGainNode.connect(this.audioContext.destination);
      }
    } catch (error) {
      console.error('Audio Context initialization failed:', error);
    }
  }

  /**
   * Play a note with the given frequency
   * @param {number} frequency - Frequency in Hz
   * @param {string} noteId - Unique identifier for the note
   */
  playNote(frequency, noteId) {
    if (!this.isInitialized) {
      this.initialize();
    }

    // If note is already playing, stop it first
    if (this.oscillators.has(noteId)) {
      this.stopNote(noteId);
    }

    try {
      // Create oscillator
      const oscillator = this.audioContext.createOscillator();
      // Use custom reed waveform when requested
      if (this.waveformType === WAVEFORM_TYPES.REED) {
        if (!this.reedWave) {
          this.reedWave = createReedWave(this.audioContext);
        }
        oscillator.setPeriodicWave(this.reedWave);
      } else {
        oscillator.type = this.waveformType;
      }
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

      // Create gain node for this note (for envelope)
      const gainNode = this.audioContext.createGain();
      
      // ADSR Envelope
      const now = this.audioContext.currentTime;
      
      // Attack: quick rise
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(
        this.masterVolume,
        now + AUDIO_CONFIG.ATTACK_TIME
      );

      // Decay: fall to sustain level
      if (!this.sustainMode) {
        gainNode.gain.linearRampToValueAtTime(
          AUDIO_CONFIG.SUSTAIN_LEVEL * this.masterVolume,
          now + AUDIO_CONFIG.ATTACK_TIME + AUDIO_CONFIG.DECAY_TIME
        );
      }

      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGainNode);

      // Start oscillator
      oscillator.start(now);

      // Store references
      this.oscillators.set(noteId, oscillator);
      this.gainNodes.set(noteId, gainNode);

      // Record if recording is active
      if (this.isRecording) {
        this.recording.push({
          type: 'noteOn',
          frequency,
          noteId,
          time: Date.now() - this.recordingStartTime,
        });
      }
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }

  /**
   * Stop playing a note
   * @param {string} noteId - Unique identifier for the note
   */
  stopNote(noteId) {
    if (!this.isInitialized) return;

    try {
      const oscillator = this.oscillators.get(noteId);
      const gainNode = this.gainNodes.get(noteId);

      if (oscillator && gainNode) {
        const now = this.audioContext.currentTime;

        // Release envelope
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + AUDIO_CONFIG.RELEASE_TIME);

        // Stop oscillator after release time
        oscillator.stop(now + AUDIO_CONFIG.RELEASE_TIME);

        // Clean up
        setTimeout(() => {
          this.oscillators.delete(noteId);
          this.gainNodes.delete(noteId);
        }, (AUDIO_CONFIG.RELEASE_TIME + 0.1) * 1000);

        // Record if recording is active
        if (this.isRecording) {
          this.recording.push({
            type: 'noteOff',
            noteId,
            time: Date.now() - this.recordingStartTime,
          });
        }
      }
    } catch (error) {
      console.error('Error stopping note:', error);
    }
  }

  /**
   * Stop all playing notes
   */
  stopAllNotes() {
    this.oscillators.forEach((oscillator, noteId) => {
      this.stopNote(noteId);
    });
  }

  /**
   * Set master volume
   * @param {number} volume - Volume level (0.0 to 1.0)
   */
  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.isInitialized && this.masterGainNode) {
      this.masterGainNode.gain.setValueAtTime(this.masterVolume, this.audioContext.currentTime);
    }
  }

  /**
   * Get current volume
   * @returns {number} Current volume level
   */
  getVolume() {
    return this.masterVolume;
  }

  /**
   * Set waveform type
   * @param {string} type - Waveform type (sine, triangle, sawtooth)
   */
  setWaveform(type) {
    this.waveformType = type;
    // clear cached wave if switching away from reed
    if (type !== WAVEFORM_TYPES.REED) {
      this.reedWave = null;
    }
  }

  /**
   * Toggle sustain mode
   */
  toggleSustain(enabled) {
    this.sustainMode = enabled;
  }

  /**
   * Get sustain mode status
   */
  isSustainEnabled() {
    return this.sustainMode;
  }

  /**
   * Start recording
   */
  startRecording() {
    this.recording = [];
    this.isRecording = true;
    this.recordingStartTime = Date.now();
  }

  /**
   * Stop recording and get the recording
   */
  stopRecording() {
    this.isRecording = false;
    return this.recording;
  }

  /**
   * Playback a recording
   * @param {Array} recording - Recording array from stopRecording()
   */
  async playRecording(recording) {
    if (!this.isInitialized) {
      this.initialize();
    }

    const playbackMap = new Map(); // Map to track notes during playback

    for (const event of recording) {
      if (event.type === 'noteOn') {
        this.playNote(event.frequency, `playback_${event.noteId}_${event.time}`);
        playbackMap.set(event.noteId, Date.now());
      } else if (event.type === 'noteOff') {
        const noteKey = `playback_${event.noteId}_${event.time}`;
        this.stopNote(noteKey);
      }

      // Wait for the next event
      const nextEventIndex = recording.indexOf(event) + 1;
      if (nextEventIndex < recording.length) {
        const waitTime = recording[nextEventIndex].time - event.time;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  /**
   * Get audio context state
   */
  getContextState() {
    if (!this.isInitialized) return 'not-initialized';
    return this.audioContext?.state || 'unknown';
  }

  /**
   * Resume audio context if suspended (required after user interaction)
   */
  async resumeAudioContext() {
    if (this.isInitialized && this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Get active note count
   */
  getActiveNoteCount() {
    return this.oscillators.size;
  }
}

// Create singleton instance
const audioService = new AudioService();

export default audioService;
