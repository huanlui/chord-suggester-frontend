import ToComponents from '../dictionaries/quality_to_components'
import ToNumber from '../dictionaries/note_to_value'
import ToNote from '../dictionaries/value_to_note'
import Constants from '../utils/Constants'
import * as Vex from 'vexflow'

export const ChordFunction = {
    Dominant: "Dominant",
    Subdominant: "Subdominant",
    Neutral: "Neutral"
};

export default class Chord {
    constructor(name) {
        const containsAccidental = name.length > 1 && (name[1] === '#' || name[1] === 'b');

        this.root_name = containsAccidental ? name.substring(0,2) : name.substring(0,1);
        this.quality_name = containsAccidental ? name.substring(2) : name.substring(1);

        this.name = name;

        this.notes = this.getNotes();
    }

    transpose(semitones) {
        let rootValue = (ToNumber[this.root_name] + semitones) % Constants.NumberOfNotes;
        rootValue = rootValue >= 0 ? rootValue : Constants.NumberOfNotes + rootValue;
        let chordName = `${ToNote[rootValue][0]}${this.quality_name}`;
        return new Chord(chordName);
    }

    isMajor() {
        const quality_components = ToComponents[this.quality_name];

        return quality_components.indexOf(3) === -1;
    }

    getPositionIn5Circle() {
        let rootValue = ToNumber[this.root_name];
        rootValue = this.isMajor() ? rootValue : (rootValue + 3) % Constants.NumberOfNotes;

        return (rootValue * 7) % Constants.NumberOfNotes;
    }

    getStepsIn5CircleRespectingTo(baseChord) {
        const distance = this.getPositionIn5Circle() - baseChord.getPositionIn5Circle();

        if(distance > Constants.NumberOfNotes / 2) {
            return distance -  Constants.NumberOfNotes;
        }

        if(distance <= - Constants.NumberOfNotes / 2) {
            return distance + Constants.NumberOfNotes;
        }

        return distance;
    }

    getFunctionRespectingTo(baseChord) {
        const distance = this.getStepsIn5CircleRespectingTo(baseChord);

        if(distance > 0) return ChordFunction.Dominant;
        if(distance < 0) return ChordFunction.Subdominant;

        if(this.root_name === baseChord.root_name) return ChordFunction.Neutral;
    
        return this.isMajor() ? ChordFunction.Dominant : ChordFunction.Subdominant;
    }

    getXYPositionIn5thCircle() {       
        const step_angle = 360.0 / Constants.NumberOfNotes;

        const angle_in_5th_circle_degrees = this.getPositionIn5Circle() * step_angle;

        const angle_in_5th_circle_radians = (angle_in_5th_circle_degrees * Math.PI) / 180

        return [
            Math.sin(angle_in_5th_circle_radians),
            Math.cos(angle_in_5th_circle_radians)
        ]
    }

    getNotes() {
        const root_value = ToNumber[this.root_name];
        const quality_components = ToComponents[this.quality_name];

        const absolute_quality_components = 
                quality_components.map(relative_component => root_value + relative_component );

        const accidentalToAvoid = this.root_name.includes('b') ? '#' : 'b';

        const baseScale = root_value >=7 ? 3 : 4;

        const notes = absolute_quality_components.map(component => {
            const suffix = baseScale + Math.floor(component / Constants.NumberOfNotes);
            const note_name = ToNote[component % Constants.NumberOfNotes].find(name => !name.includes(accidentalToAvoid))

            return `${note_name}${suffix}`
        });

        return notes;
    }

    toVexChord(showCaption, color) {
        const VF = Vex.Flow;

        const plainNotes = this.notes.map(noteName => `${noteName[0]}/${noteName[noteName.length -1]}`); //G#4 -> G/4 

        const accidentals = this.notes
                                .map( (noteName, index) => ({index, noteName}))
                                .filter(tuple => tuple.noteName.length > 2)
                                .map(tuple => ({...tuple, type: tuple.noteName[1]}));

        const result = new VF.StaveNote({clef: "treble", keys: plainNotes, duration: "w" })
        
        result.setStyle({fillStyle: color, strokeStyle: color});
        
        if(showCaption) {
            result.addModifier(0, new Vex.Flow.Annotation(this.name).setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP));
        }

        accidentals.forEach(accidental => result.addAccidental(accidental.index, new VF.Accidental(accidental.type)))
        return result;
    }
}
