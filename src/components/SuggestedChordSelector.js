import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core'
import ChordCard from './ChordCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const SuggestedChordSelector = () => {
  const classes = useStyles();

   const FormRow = () => {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <ChordCard chordName="C"></ChordCard>
        </Grid>
        <Grid item xs={4}>
          <ChordCard chordName="D#"></ChordCard>
        </Grid>
        <Grid item xs={4}>
        <ChordCard chordName="F7"></ChordCard>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" color='secondary'>Suggested chords</Typography>
      <Grid container spacing={1} style={{maxWidth:800}}>
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