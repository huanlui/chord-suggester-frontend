import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = ({open,onNoClicked, onYesClicked}) => {
  return (
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={onNoClicked}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
    >
    <DialogTitle id="alert-dialog-slide-title">{"Remove song clear"}</DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        Do you really want to remove ALL chords from the song?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={onNoClicked} color="secondary">
        No
        </Button>
        <Button onClick={onYesClicked} color="primary">
        Yes
        </Button>
    </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
