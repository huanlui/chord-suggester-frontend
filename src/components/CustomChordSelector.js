import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ToNote from './../dictionaries/value_to_note.json'
import { range } from 'lodash'
import Qualities from './../dictionaries/unique_qualities.json'
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color: '#435678'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const CustomChordSelector = ({chordAdded}) => {
    const classes = useStyles();
    const [root, setRoot] = useState('');
    const [type, setType] = useState('');

    const getSelectedChord = () => {
        return `${root}${type === 'maj' ? '' : type}`
    }

    return (
        <>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel>
                        Custom chord:
                    </InputLabel>
                </FormControl>
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
                    <FormHelperText>Is the base note of the chord</FormHelperText>
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
                    <FormHelperText>Is the type of the chord (major, minor, ...)</FormHelperText>
                </FormControl>
            </div>
            <Button onClick={() => chordAdded(getSelectedChord())} color="primary">Add Chord</Button>
        </>
    )
};

export default CustomChordSelector;