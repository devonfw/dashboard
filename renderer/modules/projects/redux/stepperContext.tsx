import * as React from 'react';
import { StepperActions } from './actions/stepper-actions';
import { updateProjectDataState } from './utils/utils';

export interface StepperState {
  activeStep: number | undefined;
  projectData?: {
    name?: string;
    type?: string;
    path?: string;
    specificArgs?: {
      [key: string]: string | boolean | null | undefined;
    };
  };
}

const initialState: StepperState = {
  activeStep: 0,
  projectData: {
    name: '',
    type: '',
    path: '',
    specificArgs: {},
  },
};

const reducer = (
  state: StepperState = initialState,
  action: StepperActions
) => {
  const activeStep = state.activeStep ? state.activeStep : 0;

  switch (action.type) {
    case 'SET_PROJECT_DATA': {
      return updateProjectDataState(state, action.payload?.projectData);
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

    default:
      throw new Error('Unknown action');
  }
};

export interface IStepperContext {
  state: StepperState;
  dispatch: (action: StepperActions) => void;
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
