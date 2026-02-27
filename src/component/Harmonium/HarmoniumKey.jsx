/**
 * HarmoniumKey Component
 * Represents a single key on the harmonium keyboard
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HarmoniumKey = ({
  note,
  isActive,
  isPlayingFromKeyboard,
  onClick,
  onMouseDown,
  onMouseUp,
  onTouchStart,
  onTouchEnd,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setIsPressed(isActive || isPlayingFromKeyboard);
  }, [isActive, isPlayingFromKeyboard]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsPressed(true);
    onMouseDown?.();
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    onMouseUp?.();
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsPressed(true);
    onTouchStart?.();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsPressed(false);
    onTouchEnd?.();
  };

  const isWhiteKey = !note.name.includes('♯') && !note.name.includes('♭');

  return (
    <motion.button
      className={`
        relative rounded-lg font-medium text-sm transition-all duration-75
        focus:outline-none focus:ring-2 focus:ring-offset-0
        ${
          isWhiteKey
            ? `
              bg-white dark:bg-slate-100 text-slate-900
              border-2 border-slate-300 dark:border-slate-400
              hover:bg-slate-50 dark:hover:bg-slate-200
              ${isPressed ? 'ring-2 ring-primary-500 shadow-lg scale-95' : 'shadow-md hover:shadow-lg'}
              focus:ring-primary-400
            `
            : `
              bg-gradient-to-b from-slate-800 to-black dark:from-slate-700 dark:to-slate-900
              text-white border-2 border-slate-900 dark:border-slate-800
              ${isPressed ? 'from-primary-600 to-primary-800 ring-2 ring-primary-400 shadow-glow scale-95' : 'shadow-lg hover:shadow-glow'}
              focus:ring-primary-400
            `
        }
        active:scale-95 active:shadow-inner active:translate-y-1
        w-full py-3 px-2 h-20 sm:h-24
        flex flex-col items-center justify-center
        cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      type="button"
      aria-label={`Play note ${note.name}`}
      title={`${note.name} (${note.frequency}Hz)`}
      whileHover={!isPressed ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.95 }}
    >
      <span className="font-semibold text-lg sm:text-xl leading-none mb-1">
        {note.name}
      </span>
      <span className={`text-xs opacity-70 leading-none ${isWhiteKey ? 'text-slate-600' : 'text-slate-300'}`}>
        {Math.round(note.frequency)}Hz
      </span>
    </motion.button>
  );
};

export default HarmoniumKey;
