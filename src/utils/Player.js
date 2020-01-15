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

const playChords = (chords, setIsPlaying, setCurrentChord) => {
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
    let index = 0;
    chordPart = new Tone.Part(function(time, chordNotes){
        setCurrentChord(chords[index]);
        polySynth.triggerAttackRelease(chordNotes, "2n", time);
        index++;
        if(index === chords.length) {
            setTimeout(() => setIsPlaying(false),2000);
        }
	}, convertedChords ).start(0);

	chordPart.loop = false;

    Tone.Transport.start();
    setIsPlaying(true);
}

export { playChord, playChords};