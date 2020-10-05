import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import LoadIcon from '../../../../shared/components/load-icon/load-icon';
import { useAccordionStyles } from '../accordion.styles';
import { useContext, useState, useEffect } from 'react';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import InstallDialog from './install-dialog';
import { InstallModulesActionData } from '../../../redux/stepper/actions/install-modules-action';
import { InstallerContext } from '../../../redux/installer/installer';

export default function ModulesInstallation(): JSX.Element {
  const classes = useAccordionStyles();
  const { state, dispatch } = useContext(StepperContext);
  const { triggerInstallation } = useContext(InstallerContext);
  const [install, setInstall] = useState<boolean | null>(null);

  const proceedInstall = () => {
    setInstall(true);
    dispatch(new InstallModulesActionData(true));
    triggerInstallation({
      projectName: state.projectData.name,
      idePath: state.projectData.path,
    });
  };

  const cancelInstall = () => {
    setInstall(false);
  };

  useEffect(() => {
    const isAlreadyInstalled = state.install.loading || state.install.success;
    if (isAlreadyInstalled) {
      setInstall(true);
    }
  }, []);

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
        onProceed={proceedInstall}
        onCancel={cancelInstall}
        disabled={!state.create.success}
      ></InstallDialog>
    </Accordion>
  );
}
