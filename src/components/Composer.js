import SuggestedChordSelector from './SuggestedChordSelector';
import React, { useState } from 'react';
import Sheet from './Sheet';

const Composer = ({display}) => {
    const [chords, setChords] = useState([]);

    return (
        <>
          <Sheet chords={chords} setChords={setChords}></Sheet>
          <SuggestedChordSelector></SuggestedChordSelector>
        </>
    )
}

export default Composer;