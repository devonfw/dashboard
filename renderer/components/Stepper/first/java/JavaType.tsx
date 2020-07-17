import { useContext } from 'react';
import { StepperContext } from '../../redux/stepperContext';
import StackCard from '../../../cards/stack-card/StackCard';

const JavaType = (props: { variant: boolean }): JSX.Element => {
  const { dispatch } = useContext(StepperContext);
  const { variant } = props;

  const handleJava = () => {
    dispatch({ type: 'SET_STACK', payload: { stack: 'java' } });
  };

  const step = (
    <StackCard
      variant={variant}
      image="/assets/stacks/java-logo.svg"
      command="devon java new"
      onClick={handleJava}
    ></StackCard>
  );
  return step;
};

export default JavaType;
