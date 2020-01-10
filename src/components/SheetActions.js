import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'

const SheetActions = ({play, removeLast, clear, transpose, loadDefault}) => {
return (
    <div>
        <Tooltip title="Transpose 1ST Down" placement="top" arrow>
          <IconButton aria-label="Transpose 1ST Down" onClick={() => transpose(-1)}>
            <ExposureNeg1Icon fontSize='large' color='primary'></ExposureNeg1Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Listen" placement="top" arrow>
          <IconButton aria-label="Listen" onClick={(play)}>
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
        <Tooltip title="Load default song" placement="top" arrow>
          <IconButton aria-label="Load default songn" onClick={loadDefault}>
            <LibraryMusicIcon fontSize='large' color='primary'></LibraryMusicIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Transpose 1ST Up" placement="top" arrow>
          <IconButton aria-label="Transpose 1ST Up" onClick={() => transpose(1)}>
            <ExposurePlus1Icon fontSize='large' color='primary'></ExposurePlus1Icon>
          </IconButton>
        </Tooltip>
    </div>
  )
}

export default SheetActions;