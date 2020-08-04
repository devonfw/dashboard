import StackCard from '../../../../../components/cards/stack-card/StackCard';
import Grid from '@material-ui/core/Grid';
import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import { stackKeys, stacksMap, Stack } from './stacks';

export default function StackStep(): JSX.Element {
  const { dispatch } = useContext(StepperContext);

  const handleStack = (stack: string) => {
    return () => dispatch({ type: 'SET_STACK', payload: { stack } });
  };

  return (
    <Grid container spacing={4}>
      {stackKeys.map((key) => {
        const stack: Stack = stacksMap[key];

        return (
          <Grid item xs={3} key={stack.id}>
            <StackCard
              variant={false}
              image={stack.image}
              text={stack.text}
              onClick={handleStack(stack.command)}
            ></StackCard>
          </Grid>
        );
      })}
    </Grid>
  );
}
