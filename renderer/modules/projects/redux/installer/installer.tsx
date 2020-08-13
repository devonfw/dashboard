import * as React from 'react';
import { messageSender } from '../../../shared/services/renderer/messageSender.service';
import { StepperContext } from '../stepper/stepperContext';
import { InstallModulesActionData } from '../stepper/actions/install-modules-action';
import { useContext } from 'react';
import { Channel } from '../../../shared/services/renderer/renderer.service';

export interface IInstallerContext {
  logMessages: Channel[];
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
  const [logMessages, setLogMessages] = React.useState<Channel[]>([]);
  const { dispatch } = useContext(StepperContext);

  const triggerInstallation = (path: string) => {
    setLogMessages([]);
    const observable = messageSender.installModules(path);
    observable.subscribe(
      (message) => {
        setLogMessages((prev) => [...prev, { status: 'data', data: message }]);
      },
      (err) => {
        setLogMessages((prev) => [...prev, { status: 'error', data: err }]);
      },
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
