import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ToNote from './../dictionaries/value_to_note.json'
import { range } from 'lodash'
import Qualities from './../dictionaries/unique_qualities.json'

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 70
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const CustomChordSelector = ({chordAdded}) => {
    const classes = useStyles();
    const [root, setRoot] = useState('C');
    const [type, setType] = useState('maj');

    const getSelectedChord = () => {
        return `${root}${type === 'maj' ? '' : type}`
    }

    return (
        <>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel id="root-label">Root</InputLabel>
                    <Select
                    labelId="root-label"
                    id="root-select"
                    value={root}
                    onChange={event => setRoot(event.target.value)}
                    >
                    {range(0,11).map(value => <MenuItem key={value} value={ToNote[value][0]}>{ToNote[value][0]}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                    labelId="type-label"
                    id="type-select"
                    value={type}
                    onChange={event => setType(event.target.value)}
                    >
                    {Qualities.map(quality => <MenuItem key={quality || 'maj'} value={quality || 'maj'}>{quality || 'maj'}</MenuItem>)}
                    </Select>
                </FormControl>
            </div>
        </>
    )
};

export default CustomChordSelector;