import * as React from 'react';
import { StepperAction } from './stepperActions';

interface StepperState {
  activeStep: number | undefined;
  stack: string | undefined;
  stackCmd: string | undefined;
  stackCwd: string | undefined;
  projectDetails: {
    name: string;
    domain: string;
  };
  projectData?: {
    name: string;
    type: string;
    path: string;
    specificArgs?: {
      [key: string]: string | boolean | null | undefined;
    };
  };
}

const initialState: StepperState = {
  activeStep: 0,
  stack: '',
  stackCmd: '',
  stackCwd: '',
  projectDetails: {
    name: '',
    domain: '',
  },
};

const reducer = (state: StepperState = initialState, action: StepperAction) => {
  const activeStep = state.activeStep ? state.activeStep : 0;

  switch (action.type) {
    case 'SET_STACK': {
      console.log(activeStep);
      return {
        ...state,
        stack: action.payload?.stack,
        activeStep: activeStep + 1,
      };
    }

    case 'SET_PROJECT_DATA': {
      return {
        ...state,
        projectDetails: { ...action.payload?.projectDetails },
      };
    }

    case 'SET_STACK_CWD': {
      return {
        ...state,
        stackCwd: action.payload?.stackCwd,
      };
    }

    case 'SET_ACTIVE': {
      return {
        ...state,
        activeStep: action.payload?.activeStep,
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

    case 'PROJECT_DETAILS': {
      return {
        ...state,
        projectDetails: action.payload?.projectDetails,
      };
    }

    default:
      throw new Error('Unknown action');
  }
};

export interface IStepperContext {
  state: StepperState;
  dispatch: (action: StepperAction) => void;
}

export const StepperContext = React.createContext<IStepperContext>({
  state: initialState,
  dispatch: () => null,
});
export const StepperConsumer = StepperContext.Consumer;

interface StepperProviderProps {
  children: JSX.Element;
}

export function StepperProvider(props: StepperProviderProps): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StepperContext.Provider value={value}>
      {props.children}
    </StepperContext.Provider>
  );
}
