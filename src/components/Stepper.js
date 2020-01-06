import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    button: {
        "&$buttonDisabled": {
            color: '#707070'
        }
      },
    buttonDisabled: {},
  });

const Stepper = ({activeStep, setActiveStep}) => {
    const classes = useStyles();
    const theme = useTheme();
   
    const handleNext = () => {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div style={{textAlign:'center'}}>
            <div style={{width: 400, display:'inline-block'}}>
                <MobileStepper
                    style={{background: '#282c34'}}
                    variant="dots"
                    steps={6}
                    position="static"
                    activeStep={activeStep}
                    className={classes.root}
                    nextButton={
                    <Button color='primary' size="small" onClick={handleNext} disabled={activeStep === 5} classes={{ root: classes.button, disabled: classes.buttonDisabled } }>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                    }
                    backButton={
                    <Button color='primary' size="small" onClick={handleBack} disabled={activeStep === 0} classes={{ root: classes.button, disabled: classes.buttonDisabled } }>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                    }
                />                  
            </div>
      
        </div>
    );
  }

  export default Stepper;