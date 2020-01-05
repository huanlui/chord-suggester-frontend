 import React from 'react'
 import Button from '@material-ui/core/Button';

 const WidthsSelector = ({display}) => {
    return (<Button
    variant="contained"
    component="label"
    color="primary"
    style={{visibility: display ? 'visible' : 'hidden' }} 
  >
    Select width file
    <input
      type="file"
      style={{ display: "none" }}
      id="upload-weights"
      accept=".bin"
    />
    </Button>)
 }

 export default WidthsSelector;