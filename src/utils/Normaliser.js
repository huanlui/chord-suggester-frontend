import Constants from "./Constants";

export const getAverageValueInScale = (chords) => {
   const sum = values => values.reduce((a, b) => a + b, 0);
   const meanFunction = values => sum(values) / values.length;

   const positions = chords.map(chord => chord.getXYPositionIn5thCircle());

   const x_avg = meanFunction(positions.map(position => position[0]));
   const y_avg = meanFunction(positions.map(position => position[1]));

    const mean = [x_avg, y_avg];

    const angle = Math.atan2(mean[0], mean[1]);

    let angle_degrees = angle * 180 / Math.PI;

    if (Math.abs(angle_degrees) < 0.001)
        angle_degrees = 0

    if(angle_degrees < 0)
        angle_degrees = 360 + angle_degrees

    const step_angle = 360.0 / Constants.NumberOfNotes;

    const indexIn5thCircle =  angle_degrees / step_angle

    const indexInScale = (Math.round(indexIn5thCircle) * 7) % 12

    return indexInScale;
}
 
export const transpose = (chords, semitones) => {
    return chords.map(chord => chord.transpose(semitones))
}