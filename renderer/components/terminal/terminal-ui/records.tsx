import { useTerminalUIStyles } from './TerminalUI.styles';

interface RecordsProps {
  previous: { cwd: string; cmd: string }[];
}

const Records = (props: RecordsProps) => {
  const classes = useTerminalUIStyles();
  const { terminalPath, terminalCommand, mt0, mb0, colorGreen } = classes;

  return (
    <div>
      <pre>Hello this is a terminal</pre>
      {props.previous.map((prevCmd: { cwd: string; cmd: string }) => (
        <>
          <pre
            className={`${terminalPath} ${mb0} ${colorGreen}`}
          >
            {prevCmd.cwd}
          </pre>
          <pre className={`${terminalCommand} ${mt0}`}>
            {prevCmd.cmd}
          </pre>
        </>
      ))}
    </div>
  );
};

export default Records;
