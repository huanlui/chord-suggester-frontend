import * as tf from '@tensorflow/tfjs';
import ToNumber from './../dictionaries/category_to_number.json'
import ToChord from './../dictionaries/number_to_category.json'
import Constants from './Constants.js';
import Chord from './Chord';

export const loadModel = async (modelFile, weightsFile) => {
    const loadedModel = await tf.loadLayersModel(tf.io.browserFiles(
    [modelFile, weightsFile]));
    return loadedModel;
}

export const getChordSuggestions = (model, chords) => {
      const numberSequence = chords.map(chord => ToNumber[chord.name])
      const paddedSequence = pad_array(numberSequence,Constants.SequenceLength,0)
     
      let tensor = tf.tensor1d(paddedSequence, 'int32').expandDims(0);
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

const pad_array = (arr,len,fill) => {
    if(arr.length >= len) return arr;

    const pad = new Array(len - arr.length);
    pad.fill(0)

    return [...pad,...arr];
}