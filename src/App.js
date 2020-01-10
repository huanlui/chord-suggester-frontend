import React, { useEffect, useState } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Composer from './components/Composer'
import { getChordSuggestions, getModel } from './utils/Model';
import logo from './img/Logo3.png'
import SocialIcons from './components/SocialIcons';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Pachebel } from './utils/SongLibrary';
import { ModelTypes } from './utils/ModelTypes';

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

  const [model, setModel] = useState();
  const [modelType, setModelType] = useState(ModelTypes.FromNormalisedData);
  const [chords,setChords] = useState(Pachebel);
  const [chordSuggestions, setChordSuggestions] = useState();

  useEffect(() => {
    if(!modelType) return;

    getModel(modelType.modelPath, modelType.weightPath).then(loadedModel => {
      setModel(loadedModel);
    });
  }, [modelType])

  useEffect(() => {
    if(!model) return;

    const suggestions = getChordSuggestions(model, chords, modelType.mustNormalise);
    setChordSuggestions(suggestions);
  }, [model, chords, modelType]);
 
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Chord Suggester" />
        </header>
        <div className="App-body">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '80vh' }}
            >
              <Grid item xs={12}>    
                {chordSuggestions ? 
                <Composer 
                 chordSuggestions={chordSuggestions}
                 chords={chords}
                 setChords={setChords}
                 modelType={modelType}
                 setModelType={setModelType}></Composer>
                :         
                <CircularProgress thickness={1} size={200}/>}
              </Grid>   
          </Grid>
          <SocialIcons></SocialIcons>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
