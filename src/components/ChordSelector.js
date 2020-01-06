import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChordCard from './ChordCard';
import CustomChordCard from './CustomChordCard';
import Chord from '../utils/Chord';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ChordSelector = ({suggestedChords, addChord}) => {
  const classes = useStyles();

   const createRow = (chords) => {
    return (
      <React.Fragment>
        {chords.map(chord => (
          <Grid item xs={3}>
          {chord ? <ChordCard chord={chord} addChord={addChord}></ChordCard> : <CustomChordCard  addChord={addChord}></CustomChordCard>}
        </Grid>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} style={{display: 'inline-flex'}}>
      <Grid container spacing={1} style={{maxWidth:1000}}>
        <Grid container item xs={12} spacing={2}>
          {createRow(suggestedChords.slice(0,4))}
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {createRow([...suggestedChords.slice(4,7),null])}
        </Grid>
      </Grid>
    </div>
  );
}

export default ChordSelector;