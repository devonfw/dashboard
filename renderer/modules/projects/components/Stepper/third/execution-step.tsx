import Button from '@material-ui/core/Button';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import { useRouter } from 'next/router';
import { InstallModulesActionData } from '../../../redux/stepper/actions/install-modules-action';
import { CreateProjectActionData } from '../../../redux/stepper/actions/create-project-action';
import { useStepperNavigationStyles } from '../stepper-navigation/stepper-navigation.styles';
import ProjectCreation from '../../accordion/project-creation/project-creation';
import ModulesInstallation from '../../accordion/modules-installation/modules-installation';
import Box from '@material-ui/core/Box';

export default function ExecutionStep(): JSX.Element {
  const classes = useStepperNavigationStyles();
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
      <ProjectCreation></ProjectCreation>
      <ModulesInstallation></ModulesInstallation>
      <Box display="flex" mt={3}>
        <Button
          variant="outlined"
          onClick={goBack}
          disabled={state.create.loading || state.install.loading}
          className={classes.cancelButton}
        >
          BACK
        </Button>
        <AcceptButton
          onClick={finish}
          disabled={state.create.loading || state.install.loading}
          className={classes.acceptButton}
        >
          FINISH
        </AcceptButton>
      </Box>
    </>
  );
}
