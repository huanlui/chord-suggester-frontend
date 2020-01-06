import ChordSelector from './ChordSelector';
import React from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import { playChords } from '../utils/Player';

const Composer = ({chordSuggestions,chords,setChords}) => {
    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetActions 
            play={() => playChords(chords)}
            removeLast={() => setChords(previousChords => previousChords.slice(0, -1) )}
            clear={() => setChords([])}
          ></SheetActions>
          <ChordSelector 
            chordSuggestions={chordSuggestions}
            addChord={(chord) => setChords(previousChords => [...previousChords, chord])}
          ></ChordSelector>
        </>
    )
}

export default Composer;