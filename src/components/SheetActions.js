import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const SheetActions = ({play, removeLast, clear}) => {
return (
    <div>
        <Tooltip title="Listen" placement="top" arrow>
          <IconButton aria-label="Listen" onClick={play}>
            <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove last chord" placement="top" arrow>
          <IconButton aria-label="Remove last chord" onClick={removeLast}>
            <BackspaceIcon fontSize='large' color='primary'></BackspaceIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear composition" placement="top" arrow>
          <IconButton aria-label="Clear composition" onClick={clear}>
            <DeleteForeverIcon fontSize='large' color='primary'></DeleteForeverIcon>
          </IconButton>
        </Tooltip>
    </div>
  )
}

export default SheetActions;