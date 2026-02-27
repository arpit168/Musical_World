/**
 * Indian Classical Music Notes (Swaras)
 * Frequencies based on Indian Classical Music standard tuning
 * 
 * Swaras: Sa, Re, Ga, Ma, Pa, Dha, Ni (standard 7 notes)
 * Each octave consists of these 7 notes
 */

// Frequency mapping for Indian classical music (in Hz)
// Reference: C4 (Middle C) = 261.63 Hz
// Each octave has 2 times the frequency of the previous octave

export const MUSICAL_NOTES = {
  // Lower Octave (Mandra Saptak)
  SA_LOWER: { name: 'Sa ♭', frequency: 130.81, octave: -1, semitone: 0 },
  RE_LOWER: { name: 'Re ♭', frequency: 146.83, octave: -1, semitone: 2 },
  GA_LOWER: { name: 'Ga ♭', frequency: 164.81, octave: -1, semitone: 4 },
  MA_LOWER: { name: 'Ma ♭', frequency: 174.61, octave: -1, semitone: 5 },
  PA_LOWER: { name: 'Pa ♭', frequency: 196.00, octave: -1, semitone: 7 },
  DHA_LOWER: { name: 'Dha ♭', frequency: 220.00, octave: -1, semitone: 9 },
  NI_LOWER: { name: 'Ni ♭', frequency: 246.94, octave: -1, semitone: 11 },

  // Middle Octave (Madhya Saptak) - Main octave
  SA: { name: 'Sa', frequency: 261.63, octave: 0, semitone: 0 },
  RE: { name: 'Re', frequency: 293.66, octave: 0, semitone: 2 },
  GA: { name: 'Ga', frequency: 329.63, octave: 0, semitone: 4 },
  MA: { name: 'Ma', frequency: 349.23, octave: 0, semitone: 5 },
  PA: { name: 'Pa', frequency: 392.00, octave: 0, semitone: 7 },
  DHA: { name: 'Dha', frequency: 440.00, octave: 0, semitone: 9 },
  NI: { name: 'Ni', frequency: 493.88, octave: 0, semitone: 11 },

  // Higher Octave (Taar Saptak)
  SA_HIGHER: { name: 'Sa ♯', frequency: 523.25, octave: 1, semitone: 0 },
  RE_HIGHER: { name: 'Re ♯', frequency: 587.33, octave: 1, semitone: 2 },
  GA_HIGHER: { name: 'Ga ♯', frequency: 659.25, octave: 1, semitone: 4 },
  MA_HIGHER: { name: 'Ma ♯', frequency: 698.46, octave: 1, semitone: 5 },
  PA_HIGHER: { name: 'Pa ♯', frequency: 783.99, octave: 1, semitone: 7 },
  DHA_HIGHER: { name: 'Dha ♯', frequency: 880.00, octave: 1, semitone: 9 },
  NI_HIGHER: { name: 'Ni ♯', frequency: 987.77, octave: 1, semitone: 11 },
};

// Organized keyboard layout by octave for easy access
export const OCTAVES = {
  LOWER: 'LOWER',
  MIDDLE: 'MIDDLE',
  HIGHER: 'HIGHER',
};

// helper for semitone interval (12-TET)
const SEMITONE_RATIO = Math.pow(2, 1 / 12);

function makeBlackKey(note) {
  return {
    name: `${note.name}♯`, // indicate sharp
    frequency: note.frequency * SEMITONE_RATIO,
    octave: note.octave,
    semitone: note.semitone + 1,
  };
}

// Positions where a black key should appear relative to the white key indices
export const BLACK_KEY_INDICES = [0, 1, 3, 4, 5];

export const KEYBOARD_LAYOUT = {
  LOWER: generateLayout([
    MUSICAL_NOTES.SA_LOWER,
    MUSICAL_NOTES.RE_LOWER,
    MUSICAL_NOTES.GA_LOWER,
    MUSICAL_NOTES.MA_LOWER,
    MUSICAL_NOTES.PA_LOWER,
    MUSICAL_NOTES.DHA_LOWER,
    MUSICAL_NOTES.NI_LOWER,
  ]),
  MIDDLE: generateLayout([
    MUSICAL_NOTES.SA,
    MUSICAL_NOTES.RE,
    MUSICAL_NOTES.GA,
    MUSICAL_NOTES.MA,
    MUSICAL_NOTES.PA,
    MUSICAL_NOTES.DHA,
    MUSICAL_NOTES.NI,
  ]),
  HIGHER: generateLayout([
    MUSICAL_NOTES.SA_HIGHER,
    MUSICAL_NOTES.RE_HIGHER,
    MUSICAL_NOTES.GA_HIGHER,
    MUSICAL_NOTES.MA_HIGHER,
    MUSICAL_NOTES.PA_HIGHER,
    MUSICAL_NOTES.DHA_HIGHER,
    MUSICAL_NOTES.NI_HIGHER,
  ]),
};

function generateLayout(whiteNotes) {
  const blackNotes = BLACK_KEY_INDICES.map((idx) => makeBlackKey(whiteNotes[idx]));
  return { white: whiteNotes, black: blackNotes };
}


// Keyboard shortcut mappings for desktop
export const KEYBOARD_SHORTCUTS = {
  A: MUSICAL_NOTES.SA,
  W: makeBlackKey(MUSICAL_NOTES.SA),
  S: MUSICAL_NOTES.RE,
  E: makeBlackKey(MUSICAL_NOTES.RE),
  D: MUSICAL_NOTES.GA,
  F: MUSICAL_NOTES.MA,
  T: makeBlackKey(MUSICAL_NOTES.MA),
  G: MUSICAL_NOTES.PA,
  Y: makeBlackKey(MUSICAL_NOTES.PA),
  H: MUSICAL_NOTES.DHA,
  U: makeBlackKey(MUSICAL_NOTES.DHA),
  J: MUSICAL_NOTES.NI,
  
  // Higher octave with Shift
  shift_A: MUSICAL_NOTES.SA_HIGHER,
  shift_W: makeBlackKey(MUSICAL_NOTES.SA_HIGHER),
  shift_S: MUSICAL_NOTES.RE_HIGHER,
  shift_E: makeBlackKey(MUSICAL_NOTES.RE_HIGHER),
  shift_D: MUSICAL_NOTES.GA_HIGHER,
  shift_F: MUSICAL_NOTES.MA_HIGHER,
  shift_T: makeBlackKey(MUSICAL_NOTES.MA_HIGHER),
  shift_G: MUSICAL_NOTES.PA_HIGHER,
  shift_Y: makeBlackKey(MUSICAL_NOTES.PA_HIGHER),
  shift_H: MUSICAL_NOTES.DHA_HIGHER,
  shift_U: makeBlackKey(MUSICAL_NOTES.DHA_HIGHER),
  shift_J: MUSICAL_NOTES.NI_HIGHER,

  // Lower octave with Control
  ctrl_A: MUSICAL_NOTES.SA_LOWER,
  ctrl_W: makeBlackKey(MUSICAL_NOTES.SA_LOWER),
  ctrl_S: MUSICAL_NOTES.RE_LOWER,
  ctrl_E: makeBlackKey(MUSICAL_NOTES.RE_LOWER),
  ctrl_D: MUSICAL_NOTES.GA_LOWER,
  ctrl_F: MUSICAL_NOTES.MA_LOWER,
  ctrl_T: makeBlackKey(MUSICAL_NOTES.MA_LOWER),
  ctrl_G: MUSICAL_NOTES.PA_LOWER,
  ctrl_Y: makeBlackKey(MUSICAL_NOTES.PA_LOWER),
  ctrl_H: MUSICAL_NOTES.DHA_LOWER,
  ctrl_U: makeBlackKey(MUSICAL_NOTES.DHA_LOWER),
  ctrl_J: MUSICAL_NOTES.NI_LOWER,
};

// Audio synthesis constants
export const AUDIO_CONFIG = {
  SAMPLE_RATE: 44100,
  BUFFER_SIZE: 4096,
  ATTACK_TIME: 0.005, // 5ms for low latency
  DECAY_TIME: 0.1,
  SUSTAIN_LEVEL: 0.7,
  RELEASE_TIME: 0.3,
};

// Waveform types
export const WAVEFORM_TYPES = {
  SINE: 'sine',
  TRIANGLE: 'triangle',
  SAWTOOTH: 'sawtooth',
  REED: 'reed', // custom harmonium reed-like waveform
};
