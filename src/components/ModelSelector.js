 import React from 'react'
 import Button from '@material-ui/core/Button';

 const ModelSelector = ({display}) => {
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
      id="upload-json"
      accept=".json"
    />
    </Button>)
 }

 export default ModelSelector;