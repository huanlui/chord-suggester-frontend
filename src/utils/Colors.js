import { ChordFunction } from "./Chord";

export const Colors = {
    Black: 'black',
    Red: '#db3056',
    Blue: '#3282b8',
    Green: '#52de97',
    RedSelected: 'red',
    BlueSelected: 'blue',
    GreenSelected: 'green',
}

export const getRelativeChordColor = (chord, baseChord, isSelected) => {
    if(!baseChord) return Colors.Black;

    const chordFunction = chord.getFunctionRespectingTo(baseChord);

    if(isSelected) {
        if(chordFunction === ChordFunction.Dominant) {
            return Colors.RedSelected;
        } else if(chordFunction === ChordFunction.Subdominant){
             return Colors.GreenSelected;
        }
     
        return Colors.BlueSelected; 
    }

    if(chordFunction === ChordFunction.Dominant) {
        return Colors.Red;
    } else if(chordFunction === ChordFunction.Subdominant){
        return Colors.Green;
    }

    return Colors.Blue; 
}