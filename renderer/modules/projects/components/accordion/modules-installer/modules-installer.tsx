import { useContext } from 'react';
import { useModulesInstallerStyles } from './modules-installer.styles';
import { InstallerContext } from '../../../redux/installer/installer';

interface TerminalColors {
  [key: string]: string;
}

export default function ModulesInstaller(): JSX.Element {
  const classes = useModulesInstallerStyles();
  const color: TerminalColors = { error: classes.error };
  const { logMessages } = useContext(InstallerContext);

  return (
    <div className={classes.terminal}>
      {logMessages.map((message, index) => (
        <pre key={index} className={`${classes.line} ${color[message.status]}`}>
          {message.data}
        </pre>
      ))}
    </div>
  );
}
