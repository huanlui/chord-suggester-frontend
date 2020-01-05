import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChordCard from './ChordCard';
import CustomChordCard from './CustomChordCard';

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
        <CustomChordCard></CustomChordCard>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
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