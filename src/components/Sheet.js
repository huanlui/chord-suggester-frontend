import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Vex from 'vexflow'
import Paper from '@material-ui/core/Paper';

const Sheet = ({chords, setChords}) => {
    const useStyles = makeStyles(theme => ({
        paper: {
          padding: theme.spacing(1),
          textAlign: 'center',
          color: theme.palette.text.secondary,
          marginLeft: 100,
          marginRight: 100
        },
      }));

    const classes = useStyles();

    const divId = 'sheet-div';

    const width = 1100;

    const drawChord = () => {
        const VF = Vex.Flow;
        
        // Create an SVG renderer and attach it to the DIV element named "boo".
        var div = document.getElementById(divId)
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        
        // Size our svg:
        renderer.resize(width,80);
        
        // And get a drawing context:
        var context = renderer.getContext();
        
        // Create a stave at position 10, 40 of width 400 on the canvas.
        var stave = new VF.Stave(0, -20, width);
        
        // Add a clef and time signature.
        stave.addClef("treble");
        
        // Connect it to the rendering context and draw!
        stave.setContext(context).draw();
        
        //To add annotation : https://github.com/0xfe/vexflow/issues/292
        var notes = [
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
          new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "w" }).addModifier(0, new Vex.Flow.Annotation("C")
          .setVerticalJustification(Vex.Flow.Annotation.VerticalJustify.TOP)),
        ];
        
        // Create a voice in 4/4 and add above notes
        var voice = new VF.Voice({num_beats: 64,  beat_value: 4});
        voice.addTickables(notes);
        
        // Format and justify the notes to 400 pixels.
        const formatter = new VF.Formatter()
        formatter.joinVoices([voice]).format([voice], width);
        
        // Render voice
        voice.draw(context, stave);
        }

    useEffect(() => {
      drawChord();
    }, [])

    return (
        <Paper className={classes.paper}>
            <div style={{textAlign:'center'}}>
                <div id={divId} style={{width: width, display:'inline-block'}}></div>
            </div>
        </Paper>
    )
}

export default Sheet;