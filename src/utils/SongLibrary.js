import Chord from "./Chord";

export const Pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'].map(chordName => new Chord(chordName));

export const MajorIVI = ['F', 'C', 'F','C', 'F'].map(chordName => new Chord(chordName));

export const MinorIVI = ['Fm', 'C', 'Fm','C', 'Fm'].map(chordName => new Chord(chordName));

export const NeutralIVI = ['F5', 'C5', 'F5','C5', 'F5'].map(chordName => new Chord(chordName));

export const MajorIIVVI = ['F', 'C', 'F','Bb', 'C', 'F'].map(chordName => new Chord(chordName));

//http://blogs.bu.edu/sjbon/files/2015/03/Bach-Prelude-BWV-846-Condensed.pdf
export const Bach = ['C', 'Dm', 'G7','C', 'Am', 'D7', 'G', 'C', 'Am', 'D7', 'G', 'Dbm7b5', 'Dm', 'Fdim', 'C', 'F', 'D', 'G7', 'C'].map(chordName => new Chord(chordName));

