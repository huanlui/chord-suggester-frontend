import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { playChords } from '../utils/Player';

const SheetOperations = () => {
return (<div>
              <Tooltip title="Listen">
                <IconButton aria-label="Listen" onClick={() => playChords([["C4", "E4", "G5"],["C4", "E4", "G5"]])}>
                  <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove last chord">
                <IconButton aria-label="Remove last chord">
                  <BackspaceIcon fontSize='large' color='primary'></BackspaceIcon>
                </IconButton>
              </Tooltip>
        </div>)
}

export default SheetOperations;