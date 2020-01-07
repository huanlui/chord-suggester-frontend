import React, { useEffect, useState } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Composer from './components/Composer'
import Chord from './utils/Chord';
import { getChordSuggestions, getModel } from './utils/Model';
import logo from './img/Logo3.png'
import SocialIcons from './components/SocialIcons';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';

/*
TODO
- tempo selector
- Rellenar en fron más explicaciones aparte de la isntalación. 
- Evaluar el modelo!!!!!
- Hacer memoria básica en markdon o pdf. 
- Hacer memoria o explicación en la misma página  /https://rexxars.github.io/react-markdown/?
- Algún grafiquillo más bonito. 
- Incluir dataset con todas las features. 
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

const pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'];
const initialChords = pachebel.map(chordName => new Chord(chordName));

const App = () => {
  document.body.style = 'background: #282c34;';

  const [model, setModel] = useState();
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
