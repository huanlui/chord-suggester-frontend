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

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
  }));

const chordWidth = 130;
const chordHeight = 120;

const CustomChordCard = () => {
    const classes = useStyles();
    const randomId = newId('div-');

    const [customChord, setCustomChord] = useState(new Chord('C'));

    useEffect(() => {
      const div = document.getElementById(randomId);
      customChord.draw(div,chordWidth, chordHeight);
    }, [customChord, randomId])

    return (
      <Paper className={classes.paper} style={{minWidth:chordWidth + 10}}>
              <CustomChordSelector chordSelected={setCustomChord}></CustomChordSelector>
              <div style={{textAlign:'center'}}>
                <div id={randomId} style={{width: chordWidth, display:'inline-block'}}></div>
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