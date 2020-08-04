import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useAccordionStyles } from '../accordion.styles';
import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import SingleCommandTerminal from '../../../../../components/terminal/SingleCommandTerminal';

export default function ModulesInstallation(): JSX.Element {
  const classes = useAccordionStyles();
  const { state } = useContext(StepperContext);

  let stackCmd = state.stackCmd;
  stackCmd = stackCmd ? stackCmd : '';

  let stackCwd = state.stackCwd;
  stackCwd = stackCwd ? stackCwd : '';

  let projectDetails = state.projectDetails;
  projectDetails = projectDetails ? projectDetails : { name: '', domain: '' };

  const initialCommand = stackCmd;
  const initialCwd = stackCwd;

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="command-execution"
        id="command-execution"
      >
        <Typography className={classes.heading}>
          Modules installation
        </Typography>
      </AccordionSummary>
      {false ? (
        <AccordionDetails
          className={`${classes.details} ${classes.installation}`}
        >
          <Typography align="center">
            Do you want to install Packages?
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button variant="outlined" className={classes.cancel}>
              Back
            </Button>
            <AcceptButton className={classes.accept}>Proceed</AcceptButton>
          </Box>
        </AccordionDetails>
      ) : (
        <AccordionDetails
          className={`${classes.details} ${classes.installation}`}
        >
          <SingleCommandTerminal
            initialCommand={initialCommand}
            initialCwd={initialCwd}
            projectDetails={projectDetails}
          ></SingleCommandTerminal>
        </AccordionDetails>
      )}
    </Accordion>
  );
}
