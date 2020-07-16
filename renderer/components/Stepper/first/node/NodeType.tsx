import { useContext, MouseEvent } from 'react';
import { StepperContext } from '../../redux/stepperContext';
import StackCard from '../../../cards/stack-card/StackCard';

const NodeType = (props) => {
  const { dispatch } = useContext(StepperContext);
  const { variant } = props;

  const handleNode = (event: MouseEvent) => {
    dispatch({ type: 'SET_STACK', payload: { stack: 'node' } });
  };

  const step = (
    <StackCard
      variant={variant}
      image="/assets/stacks/node-logo.png"
      command="devon node new"
      onClick={handleNode}
    ></StackCard>
  );
  return step;
};

export default NodeType;
