import SuggestedChordSelector from './SuggestedChordSelector';
import React, { useState } from 'react';
import Sheet from './Sheet';
import SheetOperations from './SheetOperations';

const Composer = ({display}) => {
    const [chords, setChords] = useState(['C', 'D']);

    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetOperations></SheetOperations>
          <SuggestedChordSelector></SuggestedChordSelector>
        </>
    )
}

export default Composer;