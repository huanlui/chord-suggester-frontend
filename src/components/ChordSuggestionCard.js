import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import newId from '../utils/NewId';
import {playChord} from '../utils/Player';
import drawChords from '../utils/Drawer';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
  }));

const sheetWidth = 130;
const sheetHeight = 120;

const ChordSuggestionCard = ({suggestion, addChord}) => {
    const chord = suggestion.chord;
    const classes = useStyles();
    const randomId = newId('div-');

    useEffect(() => {
      const div = document.getElementById(randomId);
      drawChords([chord],null,null,div,sheetWidth,sheetHeight);
    }, [chord, randomId])

    return (
      <Paper className={classes.paper}>
              <Typography variant="h6" color='primary'>{chord.name}</Typography>
              <div style={{textAlign:'center', marginTop:7}}>
                <div id={randomId} style={{width: 100, display:'inline-block'}}></div>
              </div>
              <Typography>Probability: {(suggestion.probability * 100).toFixed(2)}%</Typography>
              <Tooltip title="Listen" arrow>
                <IconButton aria-label="Listen" onClick={() => playChord(chord)}>
                  <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Add" arrow>
                <IconButton aria-label="Add" onClick={() => addChord(chord)}>
                  <AddBoxIcon fontSize='large' color='primary'></AddBoxIcon>
                </IconButton>
              </Tooltip>
        </Paper>
    );
  }

  export default ChordSuggestionCard;