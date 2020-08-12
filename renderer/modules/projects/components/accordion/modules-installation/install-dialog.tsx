import AccordionDetails from '@material-ui/core/AccordionDetails';
import ModulesInstaller from '../modules-installer/modules-installer';
import { useAccordionStyles } from '../accordion.styles';
import InstallPackages from './install-packages';

interface InstallDialogProps {
  install: boolean | null;
  disabled: boolean;
  onProceed?: () => void;
  onCancel?: () => void;
}

export default function InstallDialog(props: InstallDialogProps): JSX.Element {
  const classes = useAccordionStyles();

  if (props.install === null) {
    return (
      <AccordionDetails
        className={`${classes.details} ${classes.installation}`}
      >
        <InstallPackages
          onCancel={props.onCancel}
          onProceed={props.onProceed}
          disabled={props.disabled}
        ></InstallPackages>
      </AccordionDetails>
    );
  }

  if (props.install) {
    return (
      <AccordionDetails className={classes.noPad}>
        <ModulesInstaller></ModulesInstaller>
      </AccordionDetails>
    );
  }

  return <AccordionDetails>Installation canceled</AccordionDetails>;
}
