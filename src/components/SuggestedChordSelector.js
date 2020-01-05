import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as Vex from 'vexflow'
import { Typography, Tooltip, IconButton, Fab } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import AddIcon from '@material-ui/icons/Add';

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

const drawChord = () => {
  const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("foo")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg:
renderer.resize(90,80);

// And get a drawing context:
var context = renderer.getContext();

// Create a stave at position 10, 40 of width 400 on the canvas.
var stave = new VF.Stave(0, -20, 80);

// Add a clef and time signature.
stave.addClef("treble");//.addTimeSignature("4/4");

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
const formatter = new VF.Formatter()
formatter.joinVoices([voice]).format([voice], 400);

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
              <Typography variant="h6" color='primary'>C#maj</Typography>
              <div style={{textAlign:'center'}}>
                <div id='foo' style={{width: 100, display:'inline-block'}}></div>
              </div>
              <Typography>Probability: 0.5%</Typography>
              <Tooltip title="Listen">
                <IconButton aria-label="Listen">
                  <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Add">
                <IconButton aria-label="Add">
                  <AddBoxIcon fontSize='large' color='primary'></AddBoxIcon>
                </IconButton>
              </Tooltip>
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
      <Typography variant="h5" color='secondary'>Suggested chords</Typography>
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