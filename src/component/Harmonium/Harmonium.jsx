/**
 * Harmonium Component
 * Main component integrating keyboard, controls, and audio system
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HarmoniumKeyboard from './HarmoniumKeyboard';
import HarmoniumControls from './HarmoniumControls';
import audioService from '../../services/audioService';
import { useTheme } from '../../context/ThemeContext';
import { OCTAVES } from '../../constants/musicNotes';

const Harmonium = () => {
  const [volume, setVolume] = useState(0.3);
  const [waveform, setWaveform] = useState('reed');
  const [sustainMode, setSustainMode] = useState(false);
  const [currentOctave, setCurrentOctave] = useState(OCTAVES.MIDDLE);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [activeNotes, setActiveNotes] = useState(0);
  const { isDark, toggleTheme } = useTheme();

  // Initialize audio service on first interaction
  useEffect(() => {
    const handleFirstInteraction = async () => {
      await audioService.initialize();
      await audioService.resumeAudioContext();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Update active notes count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNotes(audioService.getActiveNoteCount());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle volume changes
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioService.setVolume(newVolume);
  };

  // Handle waveform changes
  const handleWaveformChange = (newWaveform) => {
    setWaveform(newWaveform);
    audioService.setWaveform(newWaveform);
  };

  // Handle sustain mode toggle
  const handleSustainToggle = (enabled) => {
    setSustainMode(enabled);
    audioService.toggleSustain(enabled);
  };

  // Handle recording
  const handleRecordToggle = () => {
    if (!isRecording) {
      audioService.startRecording();
      setIsRecording(true);
    } else {
      const recording = audioService.stopRecording();
      setIsRecording(false);
      if (recording.length > 0) {
        setHasRecording(true);
      }
    }
  };

  // Handle recording playback
  const handlePlayRecording = async () => {
    audioService.stopAllNotes(); // Stop any playing notes first
    const recording = audioService.stopRecording();
    await audioService.playRecording(recording);
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100 dark:from-slate-900 dark:via-primary-950 dark:to-slate-900 p-4 sm:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            Harmonium Web App
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience the beauty of Indian classical music with this interactive harmonium keyboard.
            Play multiple keys simultaneously for rich polyphonic sounds.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Keyboard Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <HarmoniumKeyboard currentOctave={currentOctave} />
          </motion.div>

          {/* Controls Section */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <HarmoniumControls
              volume={volume}
              onVolumeChange={handleVolumeChange}
              waveform={waveform}
              onWaveformChange={handleWaveformChange}
              sustainMode={sustainMode}
              onSustainToggle={handleSustainToggle}
              currentOctave={currentOctave}
              onOctaveChange={setCurrentOctave}
              isRecording={isRecording}
              onRecordToggle={handleRecordToggle}
              onPlayRecording={handlePlayRecording}
              hasRecording={hasRecording}
              isDark={isDark}
              onThemeToggle={toggleTheme}
              activeNotes={activeNotes}
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" variants={itemVariants}>
          {[
            { icon: '🎹', title: 'Pure Web Audio', desc: 'No plugins required' },
            { icon: '⚡', title: 'Low Latency', desc: 'Instant response' },
            { icon: '🌙', title: 'Dark Mode', desc: 'Easy on the eyes' },
            { icon: '📱', title: 'Responsive', desc: 'Works on all devices' },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How to Use</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-3">🖱️ Mouse/Touch</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>• Click or tap any key to play a note</li>
                <li>• Click multiple keys for chords</li>
                <li>• Adjust volume with the slider</li>
                <li>• Switch between waveforms</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-3">⌨️ Keyboard</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>• Press A, S, D, F, G, H, J for natural notes (white keys)</li>
                <li>• Use W, E, T, Y, U for sharps (black keys)</li>
                <li>• Shift + key for higher octave, Ctrl/Cmd + key for lower octave</li>
                <li>• Record and playback your music</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-3">🎵 Features</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>• 21 notes across 3 octaves</li>
                <li>• Multiple waveform options</li>
                <li>• Sustain mode for smooth playing</li>
                <li>• Dark/Light theme support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary-600 dark:text-primary-400 mb-3">🎚️ Controls</h3>
              <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                <li>• Adjust volume (0-100%)</li>
                <li>• Select waveform type</li>
                <li>• Toggle sustain mode</li>
                <li>• Record and playback</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400"
          variants={itemVariants}
        >
          <p>
            Built with React, Vite, and Web Audio API • Enjoy the music! 🎵
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Harmonium;
