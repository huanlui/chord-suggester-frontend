import ToComponents from '../dictionaries/quality_to_components'
import ToNumber from '../dictionaries/note_to_value'
import ToNote from '../dictionaries/value_to_note'
import Constants from '../utils/Constants'
import * as Vex from 'vexflow'

export default class Chord {
    constructor(name) {
        const containsAccidental = name.length > 1 && (name[1] === '#' || name[1] === 'b');

        this.root_name = containsAccidental ? name.substring(0,2) : name.substring(0,1);
        this.quality_name = containsAccidental ? name.substring(2) : name.substring(1);

        this.name = name;

        this.notes = this.getNotes();
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

    toVexChord(showCaption) {
        const VF = Vex.Flow;

        const plainNotes = this.notes.map(noteName => `${noteName[0]}/${noteName[noteName.length -1]}`); //G#4 -> G/4 

        const accidentals = this.notes
                                .map( (noteName, index) => ({index, noteName}))
                                .filter(tuple => tuple.noteName.length > 2)
                                .map(tuple => ({...tuple, type: tuple.noteName[1]}));

        const result = new VF.StaveNote({clef: "treble", keys: plainNotes, duration: "w" })

        if(showCaption) {
            result.addModifier(0, new Vex.Flow.Annotation(this.name).setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP));
        }

        accidentals.forEach(accidental => result.addAccidental(accidental.index, new VF.Accidental(accidental.type)))
        return result;
    }

    draw(div, width, height){
        const VF = Vex.Flow;
        
        div.innerHTML = '';
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        
        renderer.resize(width,height);
        
        var context = renderer.getContext();
        
        const stavePositionX  = 0;
        const stavePositionY  = 0;
        const staveWidth  = width - 5;
        var stave = new VF.Stave(stavePositionX, stavePositionY, staveWidth);
       
        stave.addClef("treble");
        
        stave.setContext(context).draw();
        
        const notes = [this.toVexChord()];
        
        var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
        voice.addTickables(notes);
        
        const formatter = new VF.Formatter()
        formatter.joinVoices([voice]).format([voice], 400);
        
        voice.draw(context, stave);
    }
}
