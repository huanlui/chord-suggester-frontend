import ChordSelector from './ChordSelector';
import React, { useState, useEffect } from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import Chord from '../utils/Chord';
import { playChords } from '../utils/Player';

const Composer = ({suggestedChords,onChordsModified}) => {
    const initialChords = ['C', 'D'].map(chordName => new Chord(chordName));
    const [chords, setChords] = useState(initialChords);

    useEffect( () =>
    {
      onChordsModified(chords);
    }, [chords, onChordsModified]);


    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetActions 
            play={() => playChords(chords)}
            removeLast={() => setChords(previousChords => previousChords.slice(0, -1) )}
            clear={() => setChords([])}
          ></SheetActions>
          <ChordSelector 
            suggestedChords={suggestedChords}
            addChord={(chord) => setChords(previousChords => [...previousChords, chord])}
          ></ChordSelector>
        </>
    )
}

export default Composer;