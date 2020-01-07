import React, { useEffect, useState } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Composer from './components/Composer'
import Chord from './utils/Chord';
import { getChordSuggestions, getModel } from './utils/Model';
import logo from './img/Logo1.png'
import SocialIcons from './components/SocialIcons';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
//TODO

/*
- Poder escuchar varias veces la melodia.
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

  const [model, setModel] = useState();

  const pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'];
  const initialChords = pachebel.map(chordName => new Chord(chordName));
  const [chords,setChords] = useState(initialChords)

  const [chordSuggestions, setChordSuggestions] = useState();

  useEffect(() => {
    getModel().then(loadedModel => {
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
          <img src={logo} alt="Chord Suggester" style={{float:'left'}} />
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
