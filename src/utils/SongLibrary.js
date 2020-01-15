import Chord from "./Chord";

export const Pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'].map(chordName => new Chord(chordName));

export const MajorIVI = ['F', 'C', 'F','C', 'F'].map(chordName => new Chord(chordName));

export const MinorIVI = ['Fm', 'C', 'Fm','C', 'Fm'].map(chordName => new Chord(chordName));