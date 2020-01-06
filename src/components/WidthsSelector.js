 import React from 'react'
 import Button from '@material-ui/core/Button';

 const WeightsSelector = ({display, onSelected}) => {
    const inputId = 'upload-weights';
    
    const modelSelected = () => {
      const uploadJSONInput = document.getElementById(inputId);
      onSelected(uploadJSONInput.files[0]);
    }

    return (<Button
    variant="contained"
    component="label"
    color="primary"
    style={{display: display ? '' : 'none' }} 
  >
    Select weights file
    <input
      type="file"
      style={{ display: "none" }}
      id={inputId}
      accept=".bin"
      onChange={modelSelected}
    />
    </Button>)
 }

 export default WeightsSelector;