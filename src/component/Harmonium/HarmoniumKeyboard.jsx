/**
 * HarmoniumKeyboard Component
 * Main keyboard component that displays all harmonium keys for the current octave
 */

import React, { useState, useEffect } from 'react';
import { KEYBOARD_LAYOUT, OCTAVES, KEYBOARD_SHORTCUTS, BLACK_KEY_INDICES } from '../../constants/musicNotes';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import audioService from '../../services/audioService';
import HarmoniumKey from './HarmoniumKey';

const HarmoniumKeyboard = ({ currentOctave = OCTAVES.MIDDLE }) => {
  const [activeKeys, setActiveKeys] = useState(new Set());
  // track which notes (by frequency) are pressed via keyboard
  const [keyboardFreqs, setKeyboardFreqs] = useState(new Set());
  const noteIdMap = React.useRef({}); // map keyId -> noteId

  // Get layout for current octave (white + black keys)
  const layout = KEYBOARD_LAYOUT[currentOctave] || KEYBOARD_LAYOUT[OCTAVES.MIDDLE];
  const whiteNotes = layout.white;
  const blackNotes = layout.black;

  // Handle keyboard shortcuts
  useKeyboardShortcuts(
    (note, keyId) => {
      // prevent repeating the same physical key multiple times
      if (noteIdMap.current[keyId]) return;
      const noteId = `key_${note.frequency}_${Date.now()}`;
      noteIdMap.current[keyId] = noteId;
      audioService.playNote(note.frequency, noteId);
      setActiveKeys((prev) => new Set(prev).add(noteId));
      setKeyboardFreqs((prev) => {
        const s = new Set(prev);
        s.add(note.frequency);
        return s;
      });
    },
    (keyId) => {
      const noteId = noteIdMap.current[keyId];
      if (noteId) {
        audioService.stopNote(noteId);
        setActiveKeys((prev) => {
          const s = new Set(prev);
          s.delete(noteId);
          return s;
        });
      }
      const note = KEYBOARD_SHORTCUTS[keyId];
      if (note) {
        setKeyboardFreqs((prev) => {
          const s = new Set(prev);
          s.delete(note.frequency);
          return s;
        });
      }
      delete noteIdMap.current[keyId];
    }
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioService.stopAllNotes();
      setActiveKeys(new Set());
      setKeyboardFreqs(new Set());
    };
  }, []);

  // keep track of noteId for each key index during mouse/touch interaction
  const mouseNoteMap = React.useRef({});

  const handleMouseDown = (note, idx) => {
    const noteId = `mouse_${note.frequency}_${Date.now()}`;
    mouseNoteMap.current[idx] = noteId;
    audioService.playNote(note.frequency, noteId);
    setActiveKeys((prev) => new Set(prev).add(noteId));
  };

  const handleMouseUp = (idx) => {
    const noteId = mouseNoteMap.current[idx];
    if (noteId) {
      audioService.stopNote(noteId);
      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(noteId);
        return newSet;
      });
      delete mouseNoteMap.current[idx];
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-wood-light dark:bg-wood-dark p-4 sm:p-6">
      {/* Keyboard Title */}
      <div className="mb-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-1">
          Harmonium Keyboard
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Click keys or use keyboard: A, S, D, F, G, H, J (use W,E,T,Y,U for black notes). Shift adds higher octave, Ctrl adds lower octave.
        </p>
      </div>

      {/* Keyboard Grid */}
      <div className="relative bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 rounded-xl p-3 sm:p-4">
        {/* White keys row */}
        <div className="flex">
          {whiteNotes.map((note, index) => (
            <div key={`white_${note.name}_${index}`} className="flex-1">
              <HarmoniumKey
                note={note}
                isActive={Array.from(activeKeys).some(
                  (key) => key.includes(note.frequency) && typeof note.frequency === 'number'
                )}
                isPlayingFromKeyboard={keyboardFreqs.has(note.frequency)}
                onMouseDown={() => handleMouseDown(note, index)}
                onMouseUp={() => handleMouseUp(index)}
                onTouchStart={() => handleMouseDown(note, index)}
                onTouchEnd={() => handleMouseUp(index)}
              />
            </div>
          ))}
        </div>

        {/* Black keys overlay */}
        {blackNotes.map((note, i) => {
          const pos = BLACK_KEY_INDICES[i];
          const leftPercent = ((pos + 1) / whiteNotes.length) * 100;
          return (
            <div
              key={`black_${note.name}_${i}`}
              className="absolute top-0 z-20"
              style={{
                left: `${leftPercent}%`,
                transform: 'translateX(-50%)',
                width: `calc(100% / ${whiteNotes.length} * 0.6)`,
                height: '60%',
              }}
            >
              <HarmoniumKey
                note={note}
                isActive={Array.from(activeKeys).some(
                  (key) => key.includes(note.frequency) && typeof note.frequency === 'number'
                )}
                isPlayingFromKeyboard={keyboardFreqs.has(note.frequency)}
                onMouseDown={() => handleMouseDown(note, `b${i}`)}
                onMouseUp={() => handleMouseUp(`b${i}`)}
                onTouchStart={() => handleMouseDown(note, `b${i}`)}
                onTouchEnd={() => handleMouseUp(`b${i}`)}
              />
            </div>
          );
        })}
      </div>

      {/* Keyboard Info */}
      <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <strong>Tip:</strong> Hold multiple keys for chords. Use sustain mode for sustained tones.
          Mobile users: tap and hold for polyphonic playing.
        </p>
      </div>
    </div>
  );
};

export default HarmoniumKeyboard;
