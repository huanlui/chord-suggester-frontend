import SuggestedChordSelector from './SuggestedChordSelector';
import React, { useState } from 'react';
import Sheet from './Sheet';
import SheetOperations from './SheetOperations';
import Chord from '../utils/Chord';

const Composer = ({display}) => {
    const initialChords = ['C', 'D'].map(chordName => new Chord(chordName));
    const [chords] = useState(initialChords);

    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetOperations></SheetOperations>
          <SuggestedChordSelector></SuggestedChordSelector>
        </>
    )
}

export default Composer;