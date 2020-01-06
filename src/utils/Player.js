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

const playChords = (chords) => {
    var synth = new Tone.PolySynth(6, Tone.Synth, {
        "volume" : -8,
        "oscillator" : {
            "partials" : [1, 2, 5],
        },
        "portamento" : 0.005
    }).toMaster()

      //set the attributes using the set interface
      synth.set("detune", -1200);

    const convertedChords = chords.map( (chord, index) => [index, chord.notes]);

    var chordPart = new Tone.Part(function(time, chord){
		synth.triggerAttackRelease(chord, "2n", time);
	}, convertedChords ).start(0);

	chordPart.loop = false;

	Tone.Transport.bpm.value = 60;   
	Tone.Transport.start();
}

export { playChord, playChords};