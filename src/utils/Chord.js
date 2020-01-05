import ToComponents from '../dictionaries/quality_to_components'
import ToNumber from '../dictionaries/note_to_value'
import ToNote from '../dictionaries/value_to_note'
import Constants from '../utils/Constants'

export default class Chord {
    constructor(name) {
        const containsAccidental = name.length > 1 && (name[1] === '#' || name[1] === 'b');

        this.root_name = containsAccidental ? name.substring(0,2) : name.substring(0,1);
        this.quality_name = containsAccidental ? name.substring(2) : name.substring(1);

        this.notes = this.getNotes();
    }

    getNotes() {
        const root_value = ToNumber[this.root_name];
        const quality_components = ToComponents[this.quality_name];

        const absolute_quality_components = 
                quality_components.map(relative_component => root_value + relative_component );

        const accidentalToAvoid = this.root_name.includes('b') ? '#' : 'b';

        const notes = absolute_quality_components.map(component => {
            const suffix = 4 + Math.floor(component / Constants.NumberOfNotes);
            const note_name = ToNote[component % Constants.NumberOfNotes].find(name => !name.includes(accidentalToAvoid))

            return `${note_name}${suffix}`
        });

        return notes;
    }
}
