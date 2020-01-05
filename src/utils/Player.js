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

export default playChord;