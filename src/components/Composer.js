import ChordSelector from './ChordSelector';
import React, {useState, useEffect} from 'react';
import Sheet from './Sheet';
import SheetActions from './SheetActions';
import FifthCircle from './FifthCircle';
import { playChords } from '../utils/Player';
import ConfirmationDialog from './ConfirmationDialog';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Tooltip, IconButton } from '@material-ui/core'

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
    const [force5thCircleView, setForce5thCircleView] = useState(false);

    const clear = () => {
      setActionToConfirm(Actions.CLEAR)
      setConfirmationDialogTitle('Confirm song clear');
      setConfirmationDialogText('Do you really want to remove ALL chords from the song?');
      setConfirmDialogOpen(true);
    }

    const loadDefault = (song) => {
      setActionToConfirm(song)
      setConfirmationDialogTitle('Confirm song load');
      setConfirmationDialogText('Do you really want to load the song from library? ALL previous chords will be removed?');
      setConfirmDialogOpen(true);
    }

    const onClearConfirmed = () => {
      if(actionToConfirm === Actions.CLEAR) {
        setChords([]);
      } else {
        setChords(actionToConfirm)
      }
      
      setConfirmDialogOpen(false);
    }

    const onClearCanceled = () => {
      setActionToConfirm(null);
      setConfirmDialogOpen(false);
    }

    return (
        <>
          <Sheet chords={chords} currentChord={currentChord} baseChord={chords.length > 0 ? chords[0] : undefined}></Sheet>
            {currentChord || force5thCircleView ? 
            <>
              {!currentChord ?
                <div>
                  <Tooltip style={{marginBottom:-40}} title="Hide 5th circle view" placement="top" arrow>
                    <IconButton aria-label="Hide 5th circle view" onClick={() => setForce5thCircleView(false)}>
                      <ArrowBackIcon fontSize='large' color='primary'></ArrowBackIcon>
                    </IconButton>
                  </Tooltip>
                </div>
              : null}
              <FifthCircle selectedChord={currentChord} baseChord={chords.length > 0 ? chords[0] : undefined}></FifthCircle>
            </>
            :
            <>
              <SheetActions 
                play={() => playChords(chords, setCurrentChord)}
                removeLast={() => setChords(previousChords => previousChords.slice(0, -1) )}
                clear={clear}
                transpose={(semitones) => setChords(previousChords => previousChords.map(chord => chord.transpose(semitones))) }
                loadDefault={loadDefault}
                modelType={modelType}
                setModelType={setModelType}
                force5thCircleView={force5thCircleView}
                setForce5thCircleView={setForce5thCircleView}
              />
              <ChordSelector 
                chordSuggestions={chordSuggestions}
                addChord={(chord) => setChords(previousChords => [...previousChords, chord])}
              />
            </>
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