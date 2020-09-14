import * as React from 'react';

export interface InstallFormState {
  filename: string;
  path: string;
  license: boolean;
  settingsUrl: string;
}

const getInitialState = (): InstallFormState => ({
  filename: '',
  path: '',
  license: true,
  settingsUrl: '',
});

const reducer = (
  state: InstallFormState = getInitialState(),
  formValues: Partial<InstallFormState>
) => {
  return { ...state, ...formValues };
};

export interface IInstallFormContext {
  state: InstallFormState;
  dispatch: (formValues: Partial<InstallFormState>) => void;
}

export const InstallFormContext = React.createContext<IInstallFormContext>({
  state: getInitialState(),
  dispatch: () => null,
});
export const InstallFormConsumer = InstallFormContext.Consumer;

interface InstallFormProviderProps {
  children: JSX.Element;
  initialState?: InstallFormState;
}

export function InstallFormProvider(
  props: InstallFormProviderProps
): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, getInitialState());
  const value = { state, dispatch };
  return (
    <InstallFormContext.Provider value={value}>
      {props.children}
    </InstallFormContext.Provider>
  );
}
