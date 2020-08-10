import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ModulesInstaller from '../../modules-installer/modules-installer';
import InstallPackages from './install-packages';
import LoadIcon from '../../../../shared/components/load-icon/load-icon';
import { useAccordionStyles } from '../accordion.styles';
import { useContext, useState } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import { useRouter } from 'next/router';

export default function ModulesInstallation(): JSX.Element {
  const classes = useAccordionStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(StepperContext);
  const [install, setInstall] = useState(false);
  const path = `${state.projectData?.path}/${state.projectData?.name}`;

  const proceedInstall = () => {
    setInstall(true);
    dispatch({
      type: 'SET_INSTALL_MODULES',
      payload: { install: { loading: true } },
    });
  };

  const cancelInstall = () => {
    router.push('/projects');
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
      {!install ? (
        <AccordionDetails
          className={`${classes.details} ${classes.installation}`}
        >
          <InstallPackages
            onCancel={cancelInstall}
            onProceed={proceedInstall}
          ></InstallPackages>
        </AccordionDetails>
      ) : (
        <AccordionDetails className={classes.noPad}>
          <ModulesInstaller path={path}></ModulesInstaller>
        </AccordionDetails>
      )}
    </Accordion>
  );
}
