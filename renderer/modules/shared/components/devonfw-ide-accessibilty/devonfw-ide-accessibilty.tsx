import { useState, useContext, useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { StepperContext } from '../../../projects/redux/stepper/stepperContext';
import devonfwIdeAccessibilityStyles from './devonfw-ide-accessibilty-styles';
import DevonfwIdeAccessibilityContent from './devonfw-ide-accessibility-content/devonfw-ide-accessibility-content';

export default function DevonfwIdeAccessibilty(): JSX.Element {
  const { state, dispatch } = useContext(StepperContext);
  const classes = devonfwIdeAccessibilityStyles();
  const elRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(state.accessibility);
  }, [state.accessibility]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatchAccessibilty();
  };

  const id = open ? 'devonfw access' : undefined;

  const dispatchAccessibilty = () => {
    dispatch({ type: 'RESET_ACCESSIBILITY' });
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label="Help"
        ref={elRef}
        style={{ color: 'red' }}
      >
        <ReportProblemOutlinedIcon fontSize="large" />
      </IconButton>
      <Popper
        placement="top"
        open={open}
        id={id}
        anchorEl={elRef.current}
        className={classes.popperRoot}
      >
        <div className={classes.content}>
          <div className={classes.arrowUp}></div>
          <DevonfwIdeAccessibilityContent close={handleClose} />
        </div>
      </Popper>
    </div>
  );
}
