import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useAccordionStyles } from '../accordion.styles';
import LoadIcon from '../../../../shared/components/load-icon/load-icon';
import ProjectCreator from './project-creator';
import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepperContext';

export default function ProjectCreation(): JSX.Element {
  const classes = useAccordionStyles();
  const { state } = useContext(StepperContext);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="project-creation"
        id="project-creation"
        className={classes.summary}
      >
        <Typography className={classes.heading}>Project creation</Typography>
        <LoadIcon success />
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {/* <Typography align="center" className={classes.error}>
          Project creation failed
          <AcceptButton className={classes.accept}>Retry</AcceptButton>
        </Typography> */}
        <ProjectCreator projectData={state.projectData}></ProjectCreator>
      </AccordionDetails>
    </Accordion>
  );
}
