import React , { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as Vex from 'vexflow'
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import AddBoxIcon from '@material-ui/icons/AddBox';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import newId from '../utils/NewId';
import {playChord} from '../utils/Player';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
  }));

  const chordWidth = 130;
  const chordHeight = 120;

const ChordCard = ({chord}) => {
    const classes = useStyles();
    const randomId = newId('div-');

    useEffect(() => {
      const div = document.getElementById(randomId);
      chord.draw(div,chordWidth, chordHeight);
    }, [chord, randomId])

    return (
      <Paper className={classes.paper}>
              <Typography variant="h6" color='primary'>{chord.name}</Typography>
              <div style={{textAlign:'center', marginTop:7}}>
                <div id={randomId} style={{width: 100, display:'inline-block'}}></div>
              </div>
              <Typography>Probability: 0.5%</Typography>
              <Tooltip title="Listen" arrow>
                <IconButton aria-label="Listen" onClick={() => playChord(chord.notes)}>
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

  export default ChordCard;