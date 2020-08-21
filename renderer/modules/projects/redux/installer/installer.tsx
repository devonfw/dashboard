import * as React from 'react';
import { messageSender } from '../../../shared/services/renderer/messageSender.service';
import { StepperContext } from '../stepper/stepperContext';
import { InstallModulesActionData } from '../stepper/actions/install-modules-action';
import { useContext } from 'react';

export interface IInstallerContext {
  logMessages: string[];
  triggerInstallation: (path: string) => void;
}

export const InstallerContext = React.createContext<IInstallerContext>({
  logMessages: [],
  triggerInstallation: () => null,
});
export const InstallerConsumer = InstallerContext.Consumer;

interface InstallerProviderProps {
  children: JSX.Element;
}

export function InstallerProvider(props: InstallerProviderProps): JSX.Element {
  const [logMessages, setLogMessages] = React.useState<string[]>([]);
  const { dispatch } = useContext(StepperContext);

  const triggerInstallation = (path: string) => {
    setLogMessages([]);
    const observable = messageSender.installModules(path);
    observable.subscribe(
      (message) => setLogMessages((prev) => [...prev, message]),
      (err) => setLogMessages((prev) => [...prev, err]),
      (finishedWithError) => {
        dispatch(new InstallModulesActionData(false, !finishedWithError));
        observable.unsubscribe();
      }
    );
  };

  return (
    <InstallerContext.Provider value={{ logMessages, triggerInstallation }}>
      {props.children}
    </InstallerContext.Provider>
  );
}
