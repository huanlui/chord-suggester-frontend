import SuggestedChordSelector from './SuggestedChordSelector';
import React, { useState } from 'react';
import Sheet from './Sheet';
import SheetOperations from './SheetOperations';

const Composer = ({display}) => {
    const [chords, setChords] = useState([]);

    return (
        <>
          <Sheet chords={chords} setChords={setChords}></Sheet>
          <SheetOperations></SheetOperations>
          <SuggestedChordSelector></SuggestedChordSelector>
        </>
    )
}

export default Composer;