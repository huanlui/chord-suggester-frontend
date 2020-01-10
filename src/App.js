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

/*
TODO
- tempo selector
- Rellenar en fron más explicaciones aparte de la isntalación. 
- Evaluar el modelo!!!!!
- Hacer memoria básica en markdon o pdf. 
- Hacer memoria o explicación en la misma página  /https://rexxars.github.io/react-markdown/?
- Algún grafiquillo más bonito. 
- Incluir dataset con todas las features. 
- selector de modelo
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

  const [model, setModel] = useState();
  const [chords,setChords] = useState(Pachebel);
  const [chordSuggestions, setChordSuggestions] = useState();

  useEffect(() => {
    const modelPath = 'models/tfjs_model_lstm_normalised__W_20_lr_0_0005_epochs=50_batch_128.h5/model.json';
    const weightPath = 'models/tfjs_model_lstm_normalised__W_20_lr_0_0005_epochs=50_batch_128.h5/group1-shard1of1.bin'

    getModel(modelPath, weightPath).then(loadedModel => {
      setModel(loadedModel);
    });

  }, [])

  useEffect(() => {
    if(!model) return;

    const suggestions = getChordSuggestions(model, chords);
    setChordSuggestions(suggestions);
  }, [model, chords]);
 
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
                <Composer chordSuggestions={chordSuggestions} chords={chords} setChords={setChords}></Composer>
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
