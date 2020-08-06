import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import { useAccordionStyles } from '../accordion.styles';
import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import ModulesInstaller from '../../modules-installer/modules-installer';
import InstallPackages from './install-packages';
import LoadIcon from '../../../../shared/components/load-icon/load-icon';

export default function ModulesInstallation(): JSX.Element {
  const classes = useAccordionStyles();
  const { state } = useContext(StepperContext);
  const path = `${state.stackCwd}/${state.projectDetails.name}`;

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
        <LoadIcon success />
      </AccordionSummary>
      {false ? (
        <AccordionDetails
          className={`${classes.details} ${classes.installation}`}
        >
          <InstallPackages></InstallPackages>
        </AccordionDetails>
      ) : (
        <AccordionDetails className={classes.noPad}>
          <ModulesInstaller path={path}></ModulesInstaller>
        </AccordionDetails>
      )}
    </Accordion>
  );
}
