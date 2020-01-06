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

const ChordSelector = () => {
  const classes = useStyles();

  const chord = new Chord('D#');

   const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <ChordCard chord={chord}></ChordCard>
        </Grid>
        <Grid item xs={3}>
          <ChordCard chord={chord}></ChordCard>
        </Grid>
        <Grid item xs={3}>
          <ChordCard chord={chord}></ChordCard>
        </Grid>
        <Grid item xs={3}>
        <CustomChordCard></CustomChordCard>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} style={{display: 'inline-flex'}}>
      <Grid container spacing={1} style={{maxWidth:1000}}>
        <Grid container item xs={12} spacing={2}>
          <FormRow />
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <FormRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default ChordSelector;