import { useContext, useEffect } from 'react';
import MaterialStepper, { StepObject } from './MaterialStepper';
import StackStep from './first/stack-step';
import DataStep from './second/DataStep';
import { StepperContext } from '../../redux/stepper/stepperContext';
import ExecutionStep from './third/execution-step';

const steps: StepObject[] = [
  {
    title: 'Project type',
    content: 'Project type',
    stepJSX: <StackStep></StackStep>,
  },
  {
    title: 'Project data',
    content: 'Project data',
    stepJSX: <DataStep></DataStep>,
  },
  {
    title: 'Execution',
    content: 'Execution',
    stepJSX: <ExecutionStep></ExecutionStep>,
  },
];

export default function CustomStepper(): JSX.Element {
  const { state, dispatch } = useContext(StepperContext);

  useEffect(() => {
    dispatch({ type: 'SET_CREATING_PROJECT' });
  }, []);

  return (
    <>
      <MaterialStepper steps={steps} />
      {steps[state.activeStep].stepJSX}
    </>
  );
}
