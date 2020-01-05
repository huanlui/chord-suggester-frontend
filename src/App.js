import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ToNumber from './dictionaries/category_to_number.json'
import ToChord from './dictionaries/number_to_category.json'
import * as tf from '@tensorflow/tfjs';
import Button from '@material-ui/core/Button';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CustomChordSelector from './components/CustomChordSelector';
import SuggestedChordSelector from './components/SuggestedChordSelector';
import Stepper from './components/Stepper';

const theme = createMuiTheme({
    palette: {
      text: {
        primary: "#cfcfcf",
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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function App() {
  const [model, setModel] = useState();
  const [chords, setChords] = useState([]);
  const [jsonFile, setJsonFile] = useState();
  const [activeStep, setActiveStep] = React.useState(0);

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
 
  

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep}></Stepper>
        <header className="App-header">
          {jsonFile}
        <Button
          variant="contained"
          component="label"
          color="primary"
        >
          Select model file
          <input
            type="file"
            style={{ display: "none" }}
            id="upload-json"
            accept=".json"
          />
          </Button>
          <Button
          variant="contained"
          component="label"
          color="primary"
        >
          Select width file
          <input
            type="file"
            style={{ display: "none" }}
            id="upload-weights"
            accept=".bin"
          />
          </Button>
          <Button onClick={run} color="secondary" variant="contained">Load</Button>
          <div>{chords}</div>
          <CustomChordSelector chordAdded={newChord => setChords(previous => [...previous, newChord])}></CustomChordSelector>
          <SuggestedChordSelector></SuggestedChordSelector>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
