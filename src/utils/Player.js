import * as Tone from 'tone'

const playChord = (chord) => {
    var synth = new Tone.PolySynth(6, Tone.Synth, {
        "volume" : -8,
        "oscillator" : {
            "partials" : [1, 2, 5],
        },
        "portamento" : 0.005
    }).toMaster()

      //set the attributes using the set interface
      synth.set("detune", -1200);
      //play a chord
      synth.triggerAttackRelease(chord.notes, 1);
}

var polySynth = undefined;
var chordPart = undefined;

const stopIt = () => {
    Tone.Transport.bpm.value = 100; 
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    if(polySynth) {
        polySynth.dispose();
        polySynth = null;
    }
    if(chordPart) {
        chordPart.dispose();
        chordPart = null;
    }
}

const playChords = (chords) => {
    stopIt();

    polySynth = new Tone.PolySynth(6, Tone.Synth, {
        "volume" : -8,
        "oscillator" : {
            "partials" : [1, 2, 5],
        },
        "portamento" : 0.005
    }).toMaster()

    //set the attributes using the set interface
    polySynth.set("detune", -1200);

    const convertedChords = chords.map( (chord, index) => [index, chord.notes]);

    chordPart = new Tone.Part(function(time, chordNotes){
		polySynth.triggerAttackRelease(chordNotes, "2n", time);
	}, convertedChords ).start(0);

	chordPart.loop = false;

	Tone.Transport.start();
}

export { playChord, playChords};