import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import LoadIcon from '../../../../shared/components/load-icon/load-icon';
import { useAccordionStyles } from '../accordion.styles';
import { useContext, useState } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import InstallDialog from './install-dialog';
import { InstallModulesActionData } from '../../../redux/actions/install-modules-action';

export default function ModulesInstallation(): JSX.Element {
  const classes = useAccordionStyles();
  const { state, dispatch } = useContext(StepperContext);
  const [install, setInstall] = useState<boolean | null>(null);
  const path = `${state.projectData?.path}/${state.projectData?.name}`;

  const proceedInstall = () => {
    setInstall(true);
    dispatch(new InstallModulesActionData(true));
  };

  const cancelInstall = () => {
    setInstall(false);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="command-execution"
        id="command-execution"
        className={classes.summary}
      >
        <Typography className={classes.heading}>
          Modules installation
        </Typography>
        {install ? (
          <LoadIcon
            inProgress={state.install.loading}
            success={state.install.success}
          />
        ) : null}
      </AccordionSummary>
      <InstallDialog
        install={install}
        path={path}
        onProceed={proceedInstall}
        onCancel={cancelInstall}
      ></InstallDialog>
    </Accordion>
  );
}
