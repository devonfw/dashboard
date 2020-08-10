import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import LoadIcon from '../../../../shared/components/load-icon/load-icon';
import ProjectCreator from './project-creator';
import { useAccordionStyles } from '../accordion.styles';
import { StepperContext } from '../../../redux/stepperContext';
import { useContext, useEffect } from 'react';
import { CreateProjectActionData } from '../../../redux/actions/create-project-action';

export default function ProjectCreation(): JSX.Element {
  const classes = useAccordionStyles();
  const { state, dispatch } = useContext(StepperContext);

  const load = () => dispatch(new CreateProjectActionData(true));

  useEffect(() => {
    load();
  }, []);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="project-creation"
        id="project-creation"
        className={classes.summary}
      >
        <Typography className={classes.heading}>Project creation</Typography>
        <LoadIcon
          inProgress={state.create.loading}
          success={state.create.success}
        />
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {!state.create.loading && !state.create.success ? (
          <Typography align="center" className={classes.error}>
            Project creation failed
            <AcceptButton className={classes.accept} onClick={load}>
              Retry
            </AcceptButton>
          </Typography>
        ) : (
          <ProjectCreator projectData={state.projectData}></ProjectCreator>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
