import Chord, { ChordFunction } from './Chord'

describe('Chord', () => {
    it.each`
    name      | expected_root_name
    ${'C'}    | ${'C'}
    ${'C#'}   | ${'C#'}
    ${'C#m'}  | ${'C#'}
    ${'A'}    | ${'A'}
    ${'Ab'}   | ${'Ab'}
    ${'Abm'}  | ${'Ab'}
    `('chord created from name "$name" has root_name "$expected_root_name"', ({name, expected_root_name}) => {
        const sut = new Chord(name);

        expect(sut.root_name).toEqual(expected_root_name);
    });

    it.each`
    name      | expected_quality_name
    ${'C'}    | ${''}
    ${'C#9'}  | ${'9'}
    ${'C#m'}  | ${'m'}
    ${'Amaj'} | ${'maj'}
    ${'Ab7'}  | ${'7'}
    ${'Abm'}  | ${'m'}
    `('chord created from name "$name" has quality_name "$expected_quality_name"', ({name, expected_quality_name}) => {
        const sut = new Chord(name);

        expect(sut.quality_name).toEqual(expected_quality_name);
    });

    it.each`
    name      | expected_notes
    ${'C'}    | ${['C4', 'E4', 'G4']}
    ${'C#'}   | ${['C#4', 'F4', 'G#4']}
    ${'C#m'}  | ${['C#4', 'E4', 'G#4']}
    ${'A'}    | ${['A3', 'C#4', 'E4']}
    ${'Ab'}   | ${['Ab3', 'C4', 'Eb4']}
    ${'Abm'}  | ${['Ab3', 'B3', 'Eb4']}
    ${'Abm7'} | ${['Ab3', 'B3', 'Eb4', 'Gb4']}
    `('chord created from name "$name" has notes $expected_notes', ({name, expected_notes}) => {
        const sut = new Chord(name);

        expect(sut.notes).toEqual(expected_notes);
    });

    it.each`
    baseChord   | chord2      | expectedStep
    ${'C'}      | ${'C'}      | ${0}
    ${'C'}      | ${'Am'}     | ${0}
    ${'C'}      | ${'F'}      | ${-1}
    ${'C'}      | ${'G'}      | ${1}
    ${'C'}      | ${'D'}      | ${2}
    ${'C'}      | ${'Cm'}     | ${-3}
    ${'Cm'}     | ${'C'}      | ${3}
    `('"$chord2" has a step of $expectedStep respecting to "$chord1"', ({baseChord, chord2, expectedStep}) => {
        const base = new Chord(baseChord);
        const sut2 = new Chord(chord2);

        expect(sut2.getStepsIn5CircleRespectingTo(base)).toEqual(expectedStep);
    });

    it.each`
    baseChord   | chord2      | expectedFunction
    ${'C'}      | ${'C'}      | ${ChordFunction.Neutral}
    ${'C'}      | ${'Am'}     | ${ChordFunction.Subdominant}
    ${'C'}      | ${'F'}      | ${ChordFunction.Subdominant}
    ${'C'}      | ${'G'}      | ${ChordFunction.Dominant}
    ${'C'}      | ${'D'}      | ${ChordFunction.Dominant}
    ${'C'}      | ${'Cm'}     | ${ChordFunction.Subdominant}
    ${'Cm'}     | ${'C'}      | ${ChordFunction.Dominant}
    `('"$chord2" has a step of $expectedStep respecting to "$chord1"', ({baseChord, chord2, expectedFunction}) => {
        const base = new Chord(baseChord);
        const sut2 = new Chord(chord2);

        expect(sut2.getFunctionRespectingTo(base)).toEqual(expectedFunction);
    });
});