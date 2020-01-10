import Chord from "./Chord";
import { getAverageValueInScale, transpose } from "./Normaliser";

describe('getAverageValueInScale', () => {
    it.each`
    chordNames                       | expected_avg
    ${['C','F', 'G']}                | ${0}
    ${['C','C', 'G']}                | ${0}
    ${['C','G', 'G']}                | ${7}
    ${['C','F', 'F']}                | ${5}
    ${['Am','Dm', 'Em']}             | ${0}
    ${['Am','Am', 'Em']}             | ${0}
    ${['Am','Em', 'Em']}             | ${7}
    ${['Am','Dm', 'Dm']}             | ${5}
    `('$chordNames have average value in scale of "$expected_avg"', ({chordNames, expected_avg}) => {
        const chords = chordNames.map(chordName => new Chord(chordName));

        const avg = getAverageValueInScale(chords);    

        expect(avg).toEqual(expected_avg);
    });
});

describe('transpose', () => {
    it.each`
    chordNames           | semitones             | expectedChordNames
    ${['C','F', 'G']}    | ${1}                  | ${['Db','F#', 'Ab']}  
    ${['C','F', 'G']}    | ${-3}                 | ${['A','D','E']}   
    `('$chordNames transported "$semitones" semitones convert into $expectedChordNames', ({chordNames,semitones, expectedChordNames}) => {
        const chords = chordNames.map(chordName => new Chord(chordName));

        const transposed = transpose(chords, semitones);    

        expect(transposed.map(chord => chord.name)).toEqual(expectedChordNames);
    });
});