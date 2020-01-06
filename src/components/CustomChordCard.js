import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as Vex from 'vexflow'
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import newId from '../utils/NewId';
import {playChord} from '../utils/Player';
import CustomChordSelector from './CustomChordSelector';
import Chord from '../utils/Chord';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
  }));

const CustomChordCard = () => {
    const [customChord, setCustomChord] = useState(new Chord('C'));

    const randomId = newId('div-');

    const drawChord = () => {
        const VF = Vex.Flow;
        
        // Create an SVG renderer and attach it to the DIV element named "boo".
        var div = document.getElementById(randomId)
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
        
        const notes = [customChord.toVexChord()];
        
        // Create a voice in 4/4 and add above notes
        var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
        voice.addTickables(notes);
        
        // Format and justify the notes to 400 pixels.
        const formatter = new VF.Formatter()
        formatter.joinVoices([voice]).format([voice], 400);
        
        // Render voice
        voice.draw(context, stave);
        }

    const classes = useStyles();
    useEffect(() => {
      drawChord();
    }, [])

    return (
      <Paper className={classes.paper}>
              <CustomChordSelector chordSelected={setCustomChord}></CustomChordSelector>
              <div style={{textAlign:'center'}}>
                <div id={randomId} style={{width: 100, display:'inline-block'}}></div>
              </div>
              <Tooltip title="Listen" arrow>
                <IconButton aria-label="Listen" onClick={() => playChord(customChord.notes)}>
                  <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Add" arrow>
                <IconButton aria-label="Add">
                  <AddBoxIcon fontSize='large' color='primary'></AddBoxIcon>
                </IconButton>
              </Tooltip>
        </Paper>
    );
  }

  export default CustomChordCard;