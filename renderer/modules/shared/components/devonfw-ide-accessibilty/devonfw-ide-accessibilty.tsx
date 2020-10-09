import {
  useState,
  useContext,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { StepperContext } from '../../../projects/redux/stepper/stepperContext';
import devonfwIdeAccessibilityStyles from './devonfw-ide-accessibilty-styles';
import DevonfwIdeAccessibilityContent from './devonfw-ide-accessibility-content/devonfw-ide-accessibility-content';

export default function DevonfwIdeAccessibilty(): JSX.Element {
  const { state, dispatch } = useContext(StepperContext);
  const classes = devonfwIdeAccessibilityStyles();
  const [elRef, setElRef] = useState<null | HTMLElement>(null);
  const refButton = useRef<HTMLButtonElement>() as MutableRefObject<
    HTMLButtonElement
  >;
  const open = Boolean(elRef);
  const id = open ? 'devonfw access' : undefined;
  useEffect(() => {
    if (state.accessibility) {
      refButton.current.click();
    }
  }, [state.accessibility]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!elRef) {
      setElRef(event.currentTarget);
    }
  };

  const handleClose = () => {
    setElRef(null);
    dispatchAccessibilty();
  };

  const dispatchAccessibilty = () => {
    dispatch({ type: 'RESET_ACCESSIBILITY' });
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-label="Help"
        style={{ color: 'red' }}
        ref={refButton}
      >
        <ReportProblemOutlinedIcon fontSize="large" />
      </IconButton>
      <Popper
        placement="top"
        open={open}
        id={id}
        anchorEl={elRef}
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
