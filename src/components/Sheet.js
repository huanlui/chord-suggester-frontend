import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Vex from 'vexflow'
import Paper from '@material-ui/core/Paper';
import drawChords from '../utils/Drawer';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: 100,
    marginRight: 100
  },
}));

const sheetWidth = 1100;
const sheetHeight = 120;
const divId = 'sheet-div';

const Sheet = ({chords}) => {
    const classes = useStyles();

    useEffect(() => {
      var div = document.getElementById(divId)
      drawChords(chords, div, sheetWidth, sheetHeight,true);
    }, [chords])

    return (
        <Paper className={classes.paper}>
            <div style={{textAlign:'center'}}>
                <div id={divId} style={{width: sheetWidth, display:'inline-block'}}></div>
            </div>
        </Paper>
    )
}

export default Sheet;