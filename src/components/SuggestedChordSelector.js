import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as Vex from 'vexflow'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const drawChord2 = ()  => {
  const notes = ['C4', 'E4', 'G4']
  const VF = Vex.Flow;

var vf = new VF.Factory({
  renderer: {elementId: 'foo', width: 250, height: 150}
});

var score = vf.EasyScore();
var system = vf.System();

system.addStave({
  voices: notes.map(note => score.voice(score.notes(`${note}/w`, {stem: 'up'})))
}).addClef('treble').addTimeSignature('4/4');

vf.draw();
}

const drawChord = () => {
  const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("foo")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg:
renderer.resize(500, 500);

// And get a drawing context:
var context = renderer.getContext();

// Create a stave at position 10, 40 of width 400 on the canvas.
var stave = new VF.Stave(60, 0, 120);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

//To add annotation : https://github.com/0xfe/vexflow/issues/292
var notes = [
  // new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
  // .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP))
  new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" })
];

// Create a voice in 4/4 and add above notes
var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave);
}

const SuggestedChordSelector = () => {
  const classes = useStyles();
  useEffect(() => {
    drawChord();
  })

   const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
              C
              <div id='foo' style={{width: 100, height:100}}></div>
         </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default SuggestedChordSelector;