import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useAccordionStyles } from '../accordion.styles';

interface InstallPackagesProps {
  onProceed?: () => void;
  onCancel?: () => void;
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
          Back
        </Button>
        <AcceptButton className={classes.accept} onClick={props.onProceed}>
          Proceed
        </AcceptButton>
      </Box>
    </>
  );
}
