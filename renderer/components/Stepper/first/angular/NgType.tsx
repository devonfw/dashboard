import { useContext, MouseEvent } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import StackCard from '../../../cards/stackCard';

const NgType = () => {
  const { dispatch } = useContext(StepperContext);

  const handleNg = (event: MouseEvent) => {
    dispatch({ type: 'SET_STACK', payload: { stack: 'ng' } });
  };

  const step = (
    <StackCard
      image="/assets/stacks/angular.png"
      command="devon ng new"
      onClick={handleNg}
    ></StackCard>
  );
  return step;
};

export default NgType;
