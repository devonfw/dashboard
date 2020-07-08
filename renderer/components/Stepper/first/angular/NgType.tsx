import { useContext, MouseEvent } from 'react';
import { StepperContext } from '../../redux/stepperContext';
import StackCard from '../../../cards/stack-card/StackCard';

const NgType = (props) => {
  const { dispatch } = useContext(StepperContext);
  const {variant} = props;

  const handleNg = (event: MouseEvent) => {
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
