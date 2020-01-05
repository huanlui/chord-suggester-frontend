import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ToNumber from './category_to_number.json'
import ToChord from './number_to_category.json'
import ModelArtifact from './my_tfjs_model/model.json'
import * as tf from '@tensorflow/tfjs';

const ioHandler = {
  load: () => ModelArtifact
}

function App() {
  const [model, setModel] = useState();

  const pad_array = (arr,len,fill) => {
    if(arr.length >= len) return arr;

    const pad = new Array(len - arr.length);
    pad.fill(0)

    return [...pad,...arr];
  }

  const getModelOld = async () => {
    const loadedModel = await tf.loadLayersModel(ioHandler);
    return loadedModel;
  };

  const getModel = async () => {
    const uploadJSONInput = document.getElementById('upload-json');
    const uploadWeightsInput = document.getElementById('upload-weights');
    const loadedModel = await tf.loadLayersModel(tf.io.browserFiles(
    [uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
    return loadedModel;
  }

  const run = () => {
    const  loadModel = async () => {
      const loadedModel = await getModel();

      const pachebel = ['D' ,'A' , 'Bm' , 'F#m' , 'G' , 'D'  ,'G',  'A'];
      const pachebelNumbers = pachebel.map(chord => ToNumber[chord])
      const paddedPachebel = pad_array(pachebelNumbers,20,0)
      console.log(ModelArtifact)

      console.log(paddedPachebel)
      let tensor = tf.tensor1d(paddedPachebel, 'int32').expandDims(0);
      const prediction = loadedModel.predict(tensor)
      const values = prediction.dataSync();
      const arr = Array.from(values);
      console.log(arr[0])
      console.log(Math.max(...arr))

      arr.shift() //Remove probabiliy for null chord

      let chordProbabilities = arr.map((value,index) => ({chord:ToChord[index+1], probability:value }));

      
      chordProbabilities = chordProbabilities.sort( (left, right) => right.probability - left.probability);

      chordProbabilities = chordProbabilities.slice(0,10);
      console.log(chordProbabilities);
      
    }
    loadModel()
  }
  
  useEffect( () => {

  }, [])
 
  

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" id="upload-json"/>
        <input type="file" id="upload-weights"/>
        <button onClick={run}>Click</button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {ToNumber['C']}
          {ToChord[3]}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
