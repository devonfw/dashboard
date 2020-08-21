import StackCard from '../../stack-card/StackCard';
import Grid from '@material-ui/core/Grid';
import StepperNavigation from '../stepper-navigation/stepper-navigation';
import { useContext, useState } from 'react';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import { stackKeys, stacksMap, Stack } from './stacks';
import { NextStepAction } from '../../../redux/stepper/actions/step-action';
import { ProjectDataActionData } from '../../../redux/stepper/actions/project-data-action';
import { useRouter } from 'next/router';

export default function StackStep(): JSX.Element {
  const { dispatch } = useContext(StepperContext);
  const [stack, setStack] = useState<string>('');
  const router = useRouter();

  const goToNextStep = () => {
    dispatch(new ProjectDataActionData({ type: stack }));
    dispatch(new NextStepAction());
  };

  const goBackToProjects = () => {
    router.push('/projects');
    dispatch({ type: 'RESET_STEPPER' });
  };

  return (
    <Grid container spacing={4}>
      {stackKeys.map((key) => {
        const techStack: Stack = stacksMap[key];

        return (
          <Grid item xs={6} md={4} lg={3} xl={2} key={techStack.id}>
            <StackCard
              variant={techStack.command === stack}
              image={techStack.image}
              text={techStack.text}
              onClick={() => setStack(techStack.command)}
            />
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <StepperNavigation
          onBack={goBackToProjects}
          onNext={goToNextStep}
          disableNext={!stack}
        />
      </Grid>
    </Grid>
  );
}
