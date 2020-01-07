import React, { useEffect, useState } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Stepper from './components/Stepper';
import ModelSelector from './components/ModelSelector'
import WidthsSelector from './components/WidthsSelector'
import Composer from './components/Composer'
import Chord from './utils/Chord';
import { Typography } from '@material-ui/core';
import { loadModel, getChordSuggestions } from './utils/Model';
import { loadFile } from './utils/FileLoader';

//TODO

/*
- Poder escuchar varias veces la melodia.
- Loading al cargar modelo. 
- Puntos del stepper no se ven demasiado bien. 
- Enlace a GitHub (front), Linkedin y Correo de TW en la página
- Rellenar en fron más explicaciones aparte de la isntalación. Poner enlace a github de back.
- Subir lo que falte de back. 
- Evaluar el modelo!!!!!
- Hacer memoria básica en markdon o pdf. 
- Hacer memoria o explicación en la misma página  /https://rexxars.github.io/react-markdown/?
- Algún grafiquillo más bonito. 
- INCLUIR DATOS DE ALGUNA MANERA!!!





*/

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
    console.log(selectedWeightsFile);
    setActiveStep(2);
    setWeightsFile(selectedWeightsFile);
  }


const initModel = async () => {
  const modelFile = await loadFile('model.json', 'application/json');
  const weightsFile = await loadFile('group1-shard1of1.bin', 'application/octet-stream');
  console.log(modelFile);
  console.log(weightsFile);
  const loadedModel = await loadModel(modelFile, weightsFile);

  setModel(loadedModel);
  setActiveStep(3);
}

  useEffect(() => {
    if(activeStep !== 0) return;

    initModel().then();

  }, [activeStep])
 
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
