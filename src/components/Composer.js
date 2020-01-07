import ChordSelector from './ChordSelector';
import React, {useState} from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import { playChords } from '../utils/Player';
import ConfirmationDialog from './ConfirmationDialog';

const Composer = ({chordSuggestions,chords,setChords}) => {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const clear = () => {
      setConfirmDialogOpen(true);
    }

    const onClearConfirmed = () => {
      setChords([]);
      setConfirmDialogOpen(false);
    }

    const onClearCanceled = () => {
      setConfirmDialogOpen(false);
    }

    return (
        <>
          <Sheet chords={chords}></Sheet>
          <SheetActions 
            play={() => playChords(chords)}
            removeLast={() => setChords(previousChords => previousChords.slice(0, -1) )}
            clear={clear}
          />
          <ChordSelector 
            chordSuggestions={chordSuggestions}
            addChord={(chord) => setChords(previousChords => [...previousChords, chord])}
          />
         <ConfirmationDialog open={confirmDialogOpen} onYesClicked={onClearConfirmed} onNoClicked={onClearCanceled}/>
        </>
    );
}

export default Composer;