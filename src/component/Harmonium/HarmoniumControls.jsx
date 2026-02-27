/**
 * HarmoniumControls Component
 * Provides controls for volume, waveform, sustain, recording, and octave selection
 */

import React from 'react';
import { FiVolume2, FiVolume1, FiRadio, FiStopCircle, FiPlay } from 'react-icons/fi';
import { BiMicrophone } from 'react-icons/bi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { motion } from 'framer-motion';

const HarmoniumControls = ({
  volume,
  onVolumeChange,
  waveform,
  onWaveformChange,
  sustainMode,
  onSustainToggle,
  currentOctave,
  onOctaveChange,
  isRecording,
  onRecordToggle,
  onPlayRecording,
  hasRecording,
  isDark,
  onThemeToggle,
  activeNotes,
}) => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex justify-end">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            title={isDark ? 'Light mode' : 'Dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <MdLightMode className="w-5 h-5 text-yellow-400" />
            ) : (
              <MdDarkMode className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>

        {/* Volume Control */}
        <div>
          <label className="flex items-center gap-3 mb-3">
            {volume > 0.5 ? (
              <FiVolume2 className="text-primary-500 w-5 h-5" />
            ) : (
              <FiVolume1 className="text-primary-500 w-5 h-5" />
            )}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Volume: {Math.round(volume * 100)}%
            </span>
          </label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-600 dark:text-slate-400">0%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-slate-300 dark:bg-slate-600 rounded-lg outline-none cursor-pointer"
              title="Adjust volume"
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">100%</span>
          </div>
        </div>

        {/* Waveform Selection */}
        <div>
          <label className="flex items-center gap-3 mb-3">
            <FiRadio className="text-primary-500 w-5 h-5" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Waveform
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['sine', 'triangle', 'sawtooth', 'reed'].map((type) => (
              <button
                key={type}
                onClick={() => onWaveformChange(type)}
                className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                  waveform === type
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {type === 'reed' ? 'Reed' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Octave Selection */}
        <div>
          <label className="flex items-center gap-3 mb-3">
            <FiRadio className="text-primary-500 w-5 h-5" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Octave: {currentOctave}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['LOWER', 'MIDDLE', 'HIGHER'].map((octave) => (
              <button
                key={octave}
                onClick={() => onOctaveChange(octave)}
                className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                  currentOctave === octave
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {octave.charAt(0) + octave.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Sustain Mode */}
        <div className="flex items-center justify-between p-3 bg-slate-200 dark:bg-slate-700 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={sustainMode}
              onChange={(e) => onSustainToggle(e.target.checked)}
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Sustain Mode
            </span>
          </label>
          <span className="text-xs bg-primary-500 text-white px-2 py-1 rounded-full">
            {sustainMode ? 'ON' : 'OFF'}
          </span>
        </div>

        {/* Recording Controls */}
        <div className="space-y-2">
          <motion.button
            onClick={onRecordToggle}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-md'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BiMicrophone className="w-5 h-5" />
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </motion.button>

          {hasRecording && (
            <motion.button
              onClick={onPlayRecording}
              className="w-full py-2 px-4 rounded-lg font-semibold bg-green-500 hover:bg-green-600 text-white transition-all flex items-center justify-center gap-2 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPlay className="w-4 h-4" />
              Play Recording
            </motion.button>
          )}
        </div>

        {/* Active Notes Indicator */}
        <div className="p-3 bg-slate-200 dark:bg-slate-700 rounded-lg">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Active Notes: <span className="font-bold text-primary-500">{activeNotes}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HarmoniumControls;
