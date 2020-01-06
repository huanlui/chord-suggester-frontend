import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { playChords } from '../utils/Player';

const SheetOperations = () => {
return (<div>
              <Tooltip title="Listen" placement="top" arrow>
                <IconButton aria-label="Listen" onClick={() => playChords([["C4", "E4", "G5"],["C4", "E4", "G5"]])}>
                  <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Remove last chord" placement="top" arrow>
                <IconButton aria-label="Remove last chord">
                  <BackspaceIcon fontSize='large' color='primary'></BackspaceIcon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Clear composition" placement="top" arrow>
                <IconButton aria-label="Clear composition">
                  <DeleteForeverIcon fontSize='large' color='primary'></DeleteForeverIcon>
                </IconButton>
              </Tooltip>
        </div>)
}

export default SheetOperations;