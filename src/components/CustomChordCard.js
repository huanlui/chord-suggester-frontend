import React , { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Tooltip, IconButton } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import newId from '../utils/NewId';
import {playChord} from '../utils/Player';
import CustomChordSelector from './CustomChordSelector';
import Chord from '../utils/Chord';
import drawChords from '../utils/Drawer';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
  }));

const sheetWidth = 130;
const sheetHeight = 118.5;

const CustomChordCard = ({addChord}) => {
    const classes = useStyles();
    const randomId = newId('div-');

    const [customChord, setCustomChord] = useState(new Chord('C'));

    useEffect(() => {
      const div = document.getElementById(randomId);
      drawChords([customChord], div,sheetWidth, sheetHeight);
    }, [customChord, randomId])

    return (
      <Paper className={classes.paper} style={{minWidth:sheetWidth + 10}}>
              <CustomChordSelector chordSelected={setCustomChord}></CustomChordSelector>
              <div style={{textAlign:'center'}}>
                <div id={randomId} style={{width: sheetWidth, display:'inline-block'}}></div>
              </div>
              <Tooltip title="Listen" arrow>
                <IconButton aria-label="Listen" onClick={() => playChord(customChord.notes)}>
                  <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Add" arrow>
                <IconButton aria-label="Add" onClick={() => addChord(customChord)}>
                  <AddBoxIcon fontSize='large' color='primary'></AddBoxIcon>
                </IconButton>
              </Tooltip>
        </Paper>
    );
  }

  export default CustomChordCard;