import AccordionDetails from '@material-ui/core/AccordionDetails';
import ModulesInstaller from '../../modules-installer/modules-installer';
import { useAccordionStyles } from '../accordion.styles';
import InstallPackages from './install-packages';

interface InstallDialogProps {
  install: boolean | null;
  path: string;
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
        ></InstallPackages>
      </AccordionDetails>
    );
  }

  if (props.install) {
    return (
      <AccordionDetails className={classes.noPad}>
        <ModulesInstaller path={props.path}></ModulesInstaller>
      </AccordionDetails>
    );
  }

  return <AccordionDetails></AccordionDetails>;
}
