import * as tf from '@tensorflow/tfjs';
import ToNumber from './../dictionaries/category_to_number.json'
import ToChord from './../dictionaries/number_to_category.json'
import Constants from './Constants.js';
import Chord from './Chord';
import { loadFile } from './FileLoader.js';

export const getModel = async () => {
    const modelFile = await loadFile('model.json', 'application/json');
    const weightsFile = await loadFile('group1-shard1of1.bin', 'application/octet-stream');
  
    return await loadModel(modelFile, weightsFile);
  }

export const loadModel = async (modelFile, weightsFile) => {
    const loadedModel = await tf.loadLayersModel(tf.io.browserFiles(
    [modelFile, weightsFile]));
    return loadedModel;
}

export const getChordSuggestions = (model, chords) => {
      const numberSequence = chords.map(chord => ToNumber[chord.name])
      const sequenceWithFixedLength = ensureArrayLength(numberSequence,Constants.SequenceLength);
     
      let tensor = tf.tensor1d(sequenceWithFixedLength, 'int32').expandDims(0);
      const prediction = model.predict(tensor)
      const values = prediction.dataSync();

      const probabilities = Array.from(values);
      probabilities.shift() //Remove probabiliy for null chord

      let chordProbabilities = probabilities.map((value,index) => (
          {
            probability:value, 
            name: ToChord[index+1], 
            chord:new Chord(ToChord[index+1]) 
          }));
      chordProbabilities = chordProbabilities.sort( (left, right) => right.probability - left.probability);
      chordProbabilities = chordProbabilities.slice(0,Constants.SuggestedChordNumber);
      
      return chordProbabilities;
}

const ensureArrayLength = (array, desiredLength) => {
    if(array.length < desiredLength) return pad_array(array,desiredLength,0);

    return array.slice(array.length - desiredLength);;
}

const pad_array = (array,desiredLength,fill) => {
    const pad = new Array(desiredLength - array.length);
    pad.fill(0)

    return [...pad,...array];
}