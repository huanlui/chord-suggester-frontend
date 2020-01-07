import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChordSuggestionCard from './ChordSuggestionCard';
import CustomChordCard from './CustomChordCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ChordSelector = ({chordSuggestions, addChord}) => {
  const classes = useStyles();

   const createRow = (chordSuggestionsSlice) => {
    return (
      <React.Fragment>
        {chordSuggestionsSlice.map((suggestion, index) => (
          <Grid item xs={3} key={index}>
          {suggestion ? <ChordSuggestionCard suggestion={suggestion} addChord={addChord}></ChordSuggestionCard> : <CustomChordCard  addChord={addChord}></CustomChordCard>}
        </Grid>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root} style={{display: 'inline-flex'}}>
      <Grid container spacing={1} style={{maxWidth:1000}}>
        <Grid container item xs={12} spacing={1}>
          {createRow(chordSuggestions.slice(0,4))}
        </Grid>
        <Grid container item xs={12} spacing={1}>
          {createRow([...chordSuggestions.slice(4,7),null])}
        </Grid>
      </Grid>
    </div>
  );
}

export default ChordSelector;