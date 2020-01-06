import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import ToNumber from './dictionaries/category_to_number.json'
import ToChord from './dictionaries/number_to_category.json'
import * as tf from '@tensorflow/tfjs';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Stepper from './components/Stepper';
import ModelSelector from './components/ModelSelector'
import WidthsSelector from './components/WidthsSelector'
import Composer from './components/Composer'
import Chord from './utils/Chord';
import { Typography } from '@material-ui/core';
import { loadModel, getChordSuggestions } from './utils/Model';

const theme = createMuiTheme({
    palette: {
      text: {
        primary: "#4db6ac",
        secondary: "#707070"
      },
      primary: {
        light: '#82e9de',
        main: '#4db6ac',
        dark: '#00867d',
        contrastText: '#e8f5e9',
      },
      secondary: {
        light: '#cfcfcf',
        main: '#9e9e9e',
        dark: '#707070',
        contrastText: '#fafafa',
      },
    },
  });

const App = () => {
  document.body.style = 'background: #282c34;';

  const initialSuggestedChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(chordName => new Chord(chordName));

  const [modelFile, setModelFile] = useState();
  const [weightsFile, setWeightsFile] = useState();
  const [model, setModel] = useState();

  const pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'];
  const initialChords = pachebel.map(chordName => new Chord(chordName));
  const [chords,setChords] = useState(initialChords)

  const [activeStep, setActiveStep] = useState(0);
  const [chordSuggestions, setChordSuggestions] = useState(initialSuggestedChords);

  useEffect(() => {
    if(!modelFile) return;
    if(!weightsFile) return;

    loadModel(modelFile, weightsFile).then(loadedModel => {
      setModel(loadedModel);
      setActiveStep(3);
    })
  }, [modelFile, weightsFile])

  useEffect(() => {
    if(!model) return;

    const suggestions = getChordSuggestions(model, chords);
    setChordSuggestions(suggestions);
  }, [model, chords]);

  const onModelFileSelected = (selectedModelFile) => {
    setActiveStep(1);
    setModelFile(selectedModelFile);
  }

  const onWeightsFileSelected = (selectedWeightsFile) => {
    setActiveStep(2);
    setWeightsFile(selectedWeightsFile);
  }
 
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Stepper activeStep={activeStep} setActiveStep={setActiveStep}></Stepper>
        </header>
        <div className="App-body">
          <ModelSelector display={activeStep === 0} onSelected={onModelFileSelected}></ModelSelector>
          <WidthsSelector display={activeStep === 1} onSelected={onWeightsFileSelected}></WidthsSelector>
          {activeStep === 2 ? <Typography>Loading...</Typography> : null}
          {activeStep === 3 ? <Composer chordSuggestions={chordSuggestions} chords={chords} setChords={setChords}></Composer> : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
