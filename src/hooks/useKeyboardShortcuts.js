/**
 * useKeyboardShortcuts Hook
 * Handles keyboard input for harmonium keys
 */

import { useEffect } from 'react';
import { KEYBOARD_SHORTCUTS } from '../constants/musicNotes';

export const useKeyboardShortcuts = (onNoteStart, onNoteEnd) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!event.repeat && isHarmoniumKey(event)) {
        event.preventDefault();
        const keyId = getKeyIdentifier(event);
        const note = KEYBOARD_SHORTCUTS[keyId];
        if (note && onNoteStart) {
          onNoteStart(note, keyId);
        }
      }
    };

    const handleKeyUp = (event) => {
      if (isHarmoniumKey(event)) {
        event.preventDefault();
        const keyId = getKeyIdentifier(event);
        if (onNoteEnd) {
          onNoteEnd(keyId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onNoteStart, onNoteEnd]);
};

/**
 * Check if the pressed key is a harmonium key
 */
function isHarmoniumKey(event) {
  const key = event.key.toUpperCase();
  const isControlKey = event.ctrlKey || event.metaKey;
  const isShiftKey = event.shiftKey;

  const baseKeys = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J'];
  
  if (!baseKeys.includes(key)) return false;

  // Allow: regular keys, Shift+key, Ctrl+key
  return !isShiftKey || !isControlKey || (isShiftKey && !isControlKey) || (isControlKey && !isShiftKey);
}

/**
 * Get the note for the pressed key
 */
// derive a consistent identifier string used for lookup
function getKeyIdentifier(event) {
  const key = event.key.toUpperCase();
  const isShiftKey = event.shiftKey;
  const isControlKey = event.ctrlKey || event.metaKey;

  if (isShiftKey) return `shift_${key}`;
  if (isControlKey) return `ctrl_${key}`;
  return key;
}

export default useKeyboardShortcuts;
