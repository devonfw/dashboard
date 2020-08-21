import { useContext } from 'react';
import { useModulesInstallerStyles } from './modules-installer.styles';
import { InstallerContext } from '../../../redux/installer/installer';

export default function ModulesInstaller(): JSX.Element {
  const classes = useModulesInstallerStyles();
  const { logMessages } = useContext(InstallerContext);

  return (
    <div className={classes.terminal}>
      {logMessages.map((message, index) => (
        <pre key={index} className={classes.line}>
          {message}
        </pre>
      ))}
    </div>
  );
}
