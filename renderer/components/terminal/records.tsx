const recordsStyle: string = `
    .terminal__command,
    .terminal__path {
        width: 100%;
        overflow-wrap: break-word;
        white-space: pre-wrap;
    }
        .color--green {
        color: #00ff66;
    }

    .mb-0 {
        margin-bottom: 0;
    }

    .mt-0 {
        margin-top: 0;
    }
`;

interface RecordsProps {
  previous: { cwd: string; cmd: string }[];
}

const Records = (props: RecordsProps) => {
  return (
    <div className="terminal__previous">
      <pre>Hello this is a terminal</pre>
      {props.previous.map((prevCmd: { cwd: string; cmd: string }) => (
        <>
          <pre className="terminal__path mb-0 color--green">{prevCmd.cwd}</pre>
          <pre className="terminal__command mt-0">{prevCmd.cmd}</pre>
        </>
      ))}
      <style jsx>{recordsStyle}</style>
    </div>
  );
};

export default Records;
