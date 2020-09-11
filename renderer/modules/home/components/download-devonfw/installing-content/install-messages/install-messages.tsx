import useInstallMessagesStyles from './install-messages.styles';

export default function InstallMessages(): JSX.Element {
  const classes = useInstallMessagesStyles();

  return (
    <div className={classes.terminal}>
      {['installing 1/2', 'installing 2/2'].map((message, index) => (
        <pre key={index} className={classes.line}>
          {message}
        </pre>
      ))}
    </div>
  );
}
