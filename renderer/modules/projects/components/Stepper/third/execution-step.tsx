import ProjectAccordion from '../../accordion/project-accordion';
import Button from '@material-ui/core/Button';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import { useRouter } from 'next/router';
import { useExecutionStepStyles } from './execution-step.styles';
import { InstallModulesActionData } from '../../../redux/actions/install-modules-action';
import { CreateProjectActionData } from '../../../redux/actions/create-project-action';

export default function ExecutionStep(): JSX.Element {
  const classes = useExecutionStepStyles();
  const { state, dispatch } = useContext(StepperContext);
  const router = useRouter();
  const goBack = () => {
    dispatch({ type: 'PREVIOUS_STEP' });
    dispatch(new InstallModulesActionData(false, false));
    dispatch(new CreateProjectActionData(false, false));
  };

  const finish = () => {
    router.push('/projects');
    dispatch({ type: 'RESET_STEPPER' });
  };

  return (
    <>
      <ProjectAccordion></ProjectAccordion>
      <div className={classes.stepperButtons}>
        <Button
          variant="outlined"
          onClick={goBack}
          disabled={state.create.loading}
          className={classes.cancelButton}
        >
          BACK
        </Button>
        <AcceptButton
          onClick={finish}
          disabled={state.create.loading}
          className={classes.acceptButton}
        >
          FINISH
        </AcceptButton>
      </div>
    </>
  );
}
