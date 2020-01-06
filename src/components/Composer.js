import ChordSelector from './ChordSelector';
import React, { useState } from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import Chord from '../utils/Chord';

const Composer = ({display}) => {
    const initialChords = ['C', 'D'].map(chordName => new Chord(chordName));
    const [chords] = useState(initialChords);

    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetActions></SheetActions>
          <ChordSelector></ChordSelector>
        </>
    )
}

export default Composer;