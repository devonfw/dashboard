import * as React from 'react';
import { StepperAction } from './stepperActions';
import { INgData } from './data.model';

interface StepperState {
  activeStep: number | undefined;
  stack: string | undefined;
  stackData: INgData | undefined;
}

const initialState: StepperState = {
  activeStep: 0,
  stack: '',
  stackData: undefined,
};

const reducer = (state: StepperState = initialState, action: StepperAction) => {
  let activeStep = state.activeStep ? state.activeStep : 0;

  switch (action.type) {
    case 'SET_STACK': {
      console.log(activeStep)
      return {
        ...state,
        stack: action.payload && action.payload.stack,
        activeStep: activeStep + 1,
      };
    }

    case 'SET_STACK_DATA': {
      return {
        ...state,
        stackData: action.payload && action.payload.stackData,
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
  console.log(value);
  return (
    <StepperContext.Provider value={value}>
      {props.children}
    </StepperContext.Provider>
  );
}
