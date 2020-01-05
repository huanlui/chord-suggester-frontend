import Chord from './Chord'

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
    ${'A'}    | ${['A4', 'C#5', 'E5']}
    ${'Ab'}   | ${['Ab4', 'C5', 'Eb5']}
    ${'Abm'}  | ${['Ab4', 'B4', 'Eb5']}
    ${'Abm7'} | ${['Ab4', 'B4', 'Eb5', 'Gb5']}
    `('chord created from name "$name" has notes $expected_notes', ({name, expected_notes}) => {
        const sut = new Chord(name);

        expect(sut.notes).toEqual(expected_notes);
    });
});