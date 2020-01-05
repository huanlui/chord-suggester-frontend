import SuggestedChordSelector from './SuggestedChordSelector';
import React, { useState } from 'react';

const Composer = ({display}) => {
    const [chords, setChords] = useState([]);

    return (
        <>
          <div>{chords}</div>
          <SuggestedChordSelector></SuggestedChordSelector>
        </>
    )
}

export default Composer;