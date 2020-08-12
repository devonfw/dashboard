import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useAccordionStyles } from '../accordion.styles';

interface InstallPackagesProps {
  onProceed?: () => void;
  onCancel?: () => void;
  disabled: boolean;
}

export default function InstallPackages(
  props: InstallPackagesProps
): JSX.Element {
  const classes = useAccordionStyles();

  return (
    <>
      <Typography align="center">Do you want to install Packages?</Typography>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button
          variant="outlined"
          className={classes.cancel}
          onClick={props.onCancel}
        >
          Cancel
        </Button>
        <AcceptButton
          className={classes.accept}
          onClick={props.onProceed}
          disabled={props.disabled}
        >
          Proceed
        </AcceptButton>
      </Box>
    </>
  );
}
