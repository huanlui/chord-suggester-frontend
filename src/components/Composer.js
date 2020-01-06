import ChordSelector from './ChordSelector';
import React, { useState, useEffect } from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import Chord from '../utils/Chord';

const Composer = ({suggestedChords,onChordsModified}) => {
    const initialChords = ['C', 'D'].map(chordName => new Chord(chordName));
    const [chords] = useState(initialChords);

    useEffect( () =>
    {
      onChordsModified(chords);
    }, [chords]);

    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetActions></SheetActions>
          <ChordSelector></ChordSelector>
        </>
    )
}

export default Composer;