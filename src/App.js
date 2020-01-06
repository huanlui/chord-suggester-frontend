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

function App() {
  const initialSuggestedChords = ['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(chordName => new Chord(chordName));

  const [activeStep, setActiveStep] = useState(2);
  const [suggestedChords, setSuggestedChords] = useState(initialSuggestedChords);

  const onChordsModified = useCallback((newChords) => {
      console.log(`New chords are ${newChords.map(chord => chord.name)}`)
    },[]);

  const pad_array = (arr,len,fill) => {
    if(arr.length >= len) return arr;

    const pad = new Array(len - arr.length);
    pad.fill(0)

    return [...pad,...arr];
  }

  const getModel = async () => {
    const uploadJSONInput = document.getElementById('upload-json');
    const uploadWeightsInput = document.getElementById('upload-weights');
    const loadedModel = await tf.loadLayersModel(tf.io.browserFiles(
    [uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
    return loadedModel;
  }

  const run = () => {
    const  loadModel = async () => {
      const loadedModel = await getModel();

      const pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'];
      const pachebelNumbers = pachebel.map(chord => ToNumber[chord])
      const paddedPachebel = pad_array(pachebelNumbers,20,0)

      console.log(paddedPachebel)
      let tensor = tf.tensor1d(paddedPachebel, 'int32').expandDims(0);
      const prediction = loadedModel.predict(tensor)
      const values = prediction.dataSync();
      const arr = Array.from(values);
      console.log(arr[0])
      console.log(Math.max(...arr))

      arr.shift() //Remove probabiliy for null chord

      let chordProbabilities = arr.map((value,index) => ({chord:ToChord[index+1], probability:value }));

      
      chordProbabilities = chordProbabilities.sort( (left, right) => right.probability - left.probability);

      chordProbabilities = chordProbabilities.slice(0,10);
      console.log(chordProbabilities);
      
    }
    loadModel()
  }
  
  useEffect( () => {

  }, [])
 
  document.body.style = 'background: #282c34;';

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Stepper activeStep={activeStep} setActiveStep={setActiveStep}></Stepper>
        </header>
        <div className="App-body">
          <ModelSelector display={activeStep === 0}></ModelSelector>
          <WidthsSelector display={activeStep === 1}></WidthsSelector>
          {activeStep === 2 ? <Composer suggestedChords={suggestedChords} onChordsModified={onChordsModified}></Composer> : null}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
