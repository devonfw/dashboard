import * as React from 'react';
import { StepperActions } from './actions/stepper-actions';
import { updateProjectDataState } from './utils/utils';

export interface StepperState {
  activeStep: number | undefined;
  install: {
    loading: boolean;
    success: boolean;
  };
  create: {
    loading: boolean;
    success: boolean;
  };
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
  install: {
    loading: false,
    success: false,
  },
  create: {
    loading: false,
    success: false,
  },
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

    case 'SET_INSTALL_MODULES': {
      return {
        ...state,
        install: {
          ...state.install,
          ...action.payload.install,
        },
      };
    }

    case 'SET_CREATE_PROJECT': {
      return {
        ...state,
        create: {
          ...state.create,
          ...action.payload.create,
        },
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
  initialState?: StepperState;
}

export function StepperProvider(props: StepperProviderProps): JSX.Element {
  const storeInitialState = props.initialState
    ? props.initialState
    : initialState;

  const [state, dispatch] = React.useReducer(reducer, storeInitialState);
  const value = { state, dispatch };
  return (
    <StepperContext.Provider value={value}>
      {props.children}
    </StepperContext.Provider>
  );
}
