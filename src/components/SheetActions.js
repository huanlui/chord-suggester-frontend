import React, { useState } from 'react';
import { Tooltip, IconButton } from '@material-ui/core'
import BackspaceIcon from '@material-ui/icons/Backspace';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import { ModelTypes } from '../utils/ModelTypes';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as SongLibrary from '../utils/SongLibrary';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const SheetActions = ({play, removeLast, clear, transpose, loadDefault, modelType, setModelType, force5thCircleView, setForce5thCircleView}) => {
  const [anchorModel, setAnchorModel] = useState(null);
  const [anchorSong, setAnchorSong] = useState(null);

  const showModelMenu = event => {
    setAnchorModel(event.currentTarget);
  };

  const selectModelType = (modelType) => {
    setAnchorModel(null);
    setModelType(modelType)
  };

  const showSongMenu = event => {
    setAnchorSong(event.currentTarget);
  };

  const selectSong = (song) => {
    setAnchorSong(null);
    loadDefault(song)
  };

return (
    <div>
        <Tooltip title="Transpose 1ST Down" placement="top" arrow>
          <IconButton aria-label="Transpose 1ST Down" onClick={() => transpose(-1)}>
            <ExposureNeg1Icon fontSize='large' color='primary'></ExposureNeg1Icon>
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
        <Tooltip title="Listen" placement="top" arrow>
          <IconButton aria-label="Listen" onClick={(play)}>
            <PlayCircleOutlineIcon fontSize='large' color='primary'></PlayCircleOutlineIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Show 5th circle" placement="top" arrow>
          <IconButton aria-label="Show 5th circle" onClick={() => setForce5thCircleView(previousValue => !previousValue)}>
            <RadioButtonCheckedIcon fontSize='large' color='primary'></RadioButtonCheckedIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Load default song" placement="top" arrow>
          <IconButton aria-label="Load default song" onClick={showSongMenu}>
            <LibraryMusicIcon fontSize='large' color='primary'></LibraryMusicIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Change prediction model" placement="top" arrow>
          <IconButton aria-label="Change prediction model" onClick={showModelMenu}>
            <AccountTreeRoundedIcon fontSize='large' color='primary'></AccountTreeRoundedIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Transpose 1ST Up" placement="top" arrow>
          <IconButton aria-label="Transpose 1ST Up" onClick={() => transpose(1)}>
            <ExposurePlus1Icon fontSize='large' color='primary'></ExposurePlus1Icon>
          </IconButton>
        </Tooltip>

        <Menu
        id="model-menu"
        anchorEl={anchorModel}
        keepMounted
        open={Boolean(anchorModel)}
        onClose={() => setAnchorModel(null)}
      >
        {Object.values(ModelTypes).map( (type, index) =>
        <MenuItem 
          key={index}
          style={{fontWeight: (modelType && modelType.name === type.name) ? 'bold' : 'normal'}}
          onClick={() => selectModelType(type)}>{type.name}{(modelType && modelType.name === type.name)? " (selected) " : ""}
        </MenuItem>)}
      </Menu>


      <Menu
        id="song-menu"
        anchorEl={anchorSong}
        keepMounted
        open={Boolean(anchorSong)}
        onClose={() => setAnchorSong(null)}
      >
        {Object.keys(SongLibrary).map( (key, index) =>
        <MenuItem 
          key={index}
          onClick={() => selectSong(SongLibrary[key])}>{key}
        </MenuItem>)}
      </Menu>
    </div>
  )
}

export default SheetActions;