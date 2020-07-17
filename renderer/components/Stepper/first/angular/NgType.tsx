import { useContext } from 'react';
import { StepperContext } from '../../redux/stepperContext';
import StackCard from '../../../cards/stack-card/StackCard';

const NgType = (props: { variant: boolean }): JSX.Element => {
  const { dispatch } = useContext(StepperContext);
  const { variant } = props;

  const handleNg = () => {
    dispatch({ type: 'SET_STACK', payload: { stack: 'ng' } });
  };

  const step = (
    <StackCard
      variant={variant}
      image="/assets/stacks/angular.png"
      command="devon ng new"
      onClick={handleNg}
    ></StackCard>
  );
  return step;
};

export default NgType;
