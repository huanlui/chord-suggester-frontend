import ChordSelector from './ChordSelector';
import React, {useState, useEffect} from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import FifthCircle from './FifthCircle';
import { playChords } from '../utils/Player';
import ConfirmationDialog from './ConfirmationDialog';
import { Pachebel } from '../utils/SongLibrary';

const Actions = {
  CLEAR: 'CLEAR',
  LOAD_DEFAULT: 'LOAD_DEFAULT'
}

const Composer = ({chordSuggestions,chords,setChords,modelType, setModelType}) => {
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [confirmationDialogTitle, setConfirmationDialogTitle] = useState('');
    const [confirmationDialogText, setConfirmationDialogText] = useState('');
    const [actionToConfirm, setActionToConfirm] = useState(null);
    const [currentChord,setCurrentChord] = useState(undefined);
    const [isPlaying, setIsPlaying] = useState(false);

    const clear = () => {
      setActionToConfirm(Actions.CLEAR)
      setConfirmationDialogTitle('Confirm song clear');
      setConfirmationDialogText('Do you really want to remove ALL chords from the song?');
      setConfirmDialogOpen(true);
    }

    const loadDefault = () => {
      setActionToConfirm(Actions.LOAD_DEFAULT)
      setConfirmationDialogTitle('Confirm song load');
      setConfirmationDialogText('Do you really want to load the song from library? ALL previous chords will be removed?');
      setConfirmDialogOpen(true);
    }

    const onClearConfirmed = () => {
      if(actionToConfirm === Actions.CLEAR) {
        setChords([]);
      }

      if(actionToConfirm === Actions.LOAD_DEFAULT) {
        console.log('Pachebel', Pachebel)
        setChords(Pachebel)
      }
      setConfirmDialogOpen(false);
    }

    const onClearCanceled = () => {
      setActionToConfirm(null);
      setConfirmDialogOpen(false);
    }

    return (
        <>
          <Sheet chords={chords}></Sheet>
            {!isPlaying ? 
            <>
              <SheetActions 
                play={() => playChords(chords, setIsPlaying, setCurrentChord)}
                removeLast={() => setChords(previousChords => previousChords.slice(0, -1) )}
                clear={clear}
                transpose={(semitones) => setChords(previousChords => previousChords.map(chord => chord.transpose(semitones))) }
                loadDefault={loadDefault}
                modelType={modelType}
                setModelType={setModelType}
              />
              <ChordSelector 
                chordSuggestions={chordSuggestions}
                addChord={(chord) => setChords(previousChords => [...previousChords, chord])}
              />
            </>
            :
            <FifthCircle selectedChord={currentChord}></FifthCircle>
            }
            <ConfirmationDialog 
              title={confirmationDialogTitle} 
              message={confirmationDialogText} 
              open={confirmDialogOpen} 
              onYesClicked={onClearConfirmed} 
              onNoClicked={onClearCanceled}
            />
        </>
    );
}

export default Composer;