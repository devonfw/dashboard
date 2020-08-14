import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useStepperNavigationStyles } from './stepper-navigation.styles';

interface StepperNavigationProps {
  onBack: () => void;
  onNext: () => void;
  disableBack?: boolean;
  disableNext?: boolean;
}

export default function StepperNavigation(
  props: StepperNavigationProps
): JSX.Element {
  const classes = useStepperNavigationStyles();
  return (
    <Box display="flex" mt={3}>
      <Button
        variant="outlined"
        className={classes.cancelButton}
        onClick={props.onBack}
        disabled={props.disableBack}
      >
        Back
      </Button>
      <AcceptButton
        className={classes.acceptButton}
        onClick={props.onNext}
        disabled={props.disableNext}
      >
        Next
      </AcceptButton>
    </Box>
  );
}
