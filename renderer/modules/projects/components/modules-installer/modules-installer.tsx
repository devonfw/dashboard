import { messageSender } from '../../../shared/services/renderer/messageSender.service';
import { useEffect, useState } from 'react';
import { useModulesInstallerStyles } from './modules-installer.styles';
import { Channel } from '../../../shared/services/renderer/renderer.service';

interface ModulesInstallerProps {
  path: string;
}

interface TerminalColors {
  [key: string]: string;
}

export default function ModulesInstaller(
  props: ModulesInstallerProps
): JSX.Element {
  const classes = useModulesInstallerStyles();
  const color: TerminalColors = { error: classes.error };
  const [logMessages, setLogMessages] = useState<Channel[]>([]);

  useEffect(() => {
    const observable = messageSender.installModules(props.path);
    observable.subscribe(
      (message) => {
        setLogMessages((prev) => [...prev, { status: 'data', data: message }]);
      },
      (err) => {
        setLogMessages((prev) => [...prev, { status: 'error', data: err }]);
      }
    );

    return () => {
      observable.unsubscribe();
    };
  }, []);

  return (
    <div className={classes.terminal}>
      {logMessages.map((message, index) => (
        <pre key={index} className={color[message.status]}>
          {message.data}
        </pre>
      ))}
    </div>
  );
}
