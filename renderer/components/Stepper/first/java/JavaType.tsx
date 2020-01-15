import { useContext, MouseEvent } from 'react';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import StackCard from '../../../cards/stackCard';

const JavaType = () => {
  const { dispatch } = useContext(StepperContext);

  const handleJava = (event: MouseEvent) => {
    dispatch({ type: 'SET_STACK', payload: { stack: 'java' } });
  };

  const step = (
    <StackCard
      image="/assets/stacks/java-logo.svg"
      command="devon java new"
      onClick={handleJava}
    ></StackCard>
  );
  return step;
};

export default JavaType;
