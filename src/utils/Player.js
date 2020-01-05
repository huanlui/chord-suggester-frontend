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
      synth.triggerAttackRelease(chord, 1);
}

//Example: playChords([["C4", "E4", "G4"], ["F4", "A4", "C5"], ["F4", "A4", "C5"], ["C4", "E4", "G4"]])
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

    const convertedChords = chords.map( (chord, index) => [index, chord]);

    var chordPart = new Tone.Part(function(time, chord){
        console.log(chord)
		synth.triggerAttackRelease(chord, "2n", time);
	}, convertedChords ).start(0);

	chordPart.loop = false;

	Tone.Transport.bpm.value = 60;   
	Tone.Transport.start();
}

export { playChord, playChords};