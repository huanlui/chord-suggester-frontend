 import React from 'react'
 import Button from '@material-ui/core/Button';

 const ModelSelector = ({display, onSelected}) => {
    const inputId = 'upload-json';
    
    const modelSelected = () => {
      const uploadJSONInput = document.getElementById(inputId);
      console.log(uploadJSONInput.files[0]);
      onSelected(uploadJSONInput.files[0]);
    }

    return (<Button
    variant="contained"
    component="label"
    color="primary"
    style={{display: display ? '' : 'none' }} 
  >
    Select model file
    <input
      type="file"
      style={{ display: "none" }}
      id={inputId}
      accept=".json"
      onChange={modelSelected}
    />
    </Button>)
 }

 export default ModelSelector;