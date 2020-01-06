import * as Vex from 'vexflow'

const drawChords = (chords, div, width, height, showCaption) => {
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
    
    const notes = chords.map(chord => chord.toVexChord(showCaption))
    
    var voice = new VF.Voice({num_beats: 4 * chords.length,  beat_value: 4});
    voice.addTickables(notes);
    
    const formatter = new VF.Formatter()
    formatter.joinVoices([voice]).format([voice], 400);
    
    voice.draw(context, stave);
};

export default drawChords;