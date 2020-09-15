import useInstallMessagesStyles from './install-messages.styles';

export default function InstallMessages(props: {
  messages: string[];
}): JSX.Element {
  const classes = useInstallMessagesStyles();

  return (
    <div className={classes.terminal}>
      {props.messages?.map((message, index) => (
        <pre key={index} className={classes.line}>
          {message}
        </pre>
      ))}
    </div>
  );
}
