import * as React from 'react';
import { StepperAction } from './stepperActions';

interface StepperState {
  activeStep: number | undefined;
  stack: string | undefined;
  stackCmd: string | undefined;
  stackCwd: string | undefined;
}

const initialState: StepperState = {
  activeStep: 0,
  stack: '',
  stackCmd: '',
  stackCwd: '',
};

const reducer = (state: StepperState = initialState, action: StepperAction) => {
  let activeStep = state.activeStep ? state.activeStep : 0;

  switch (action.type) {
    case 'SET_STACK': {
      console.log(activeStep);
      return {
        ...state,
        stack: action.payload && action.payload.stack,
        activeStep: activeStep + 1,
      };
    }

    case 'SET_STACK_CMD': {
      return {
        ...state,
        stackCmd: action.payload && action.payload.stackCmd,
      };
    }

    case 'SET_STACK_CWD': {
      return {
        ...state,
        stackCwd: action.payload && action.payload.stackCwd,
      };
    }

    case 'SET_ACTIVE': {
      return {
        ...state,
        activeStep: action.payload && action.payload.activeStep,
      };
    }

    case 'NEXT_STEP': {
      return { ...state, activeStep: activeStep + 1 };
    }

    case 'PREVIOUS_STEP': {
      return { ...state, activeStep: activeStep - 1 };
    }

    case 'RESET_STEP': {
      return { ...state, activeStep: 0 };
    }
    default:
      throw new Error();
  }
};

export interface IStepperContext {
  state: StepperState;
  dispatch: (action: StepperAction) => void;
}

export const StepperContext = React.createContext<IStepperContext>({
  state: initialState,
  dispatch: () => {},
});
export const StepperConsumer = StepperContext.Consumer;

export function StepperProvider(props: any) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  console.log('provider value stepper');
  console.log(value);
  return (
    <StepperContext.Provider value={value}>
      {props.children}
    </StepperContext.Provider>
  );
}
