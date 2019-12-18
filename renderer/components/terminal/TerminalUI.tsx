import {
  Component,
  createRef,
  RefObject,
} from 'react';
import Records from './records';

export interface TerminalUIProps {
  previous: Array<{ cwd: string; cmd: string }>;
  cwd: string;
}

export interface TerminalUIState {
  input: string;
}

class TerminalUI extends Component<TerminalUIProps, TerminalUIState> {
  scrollAnchor: RefObject<HTMLInputElement>;

  state = {
    input: '',
  }

  constructor(props: TerminalUIProps) {
    super(props);
    this.scrollAnchor = createRef();
  }

  componentDidUpdate(prevProps: TerminalUIProps, prevState: {}, snapshot: any) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    let current = this.scrollAnchor.current;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  

  render() {
    return (
      <>
        <div className="terminal">
          <Records previous={this.props.previous} />
          <span className="font--console color--green">{this.props.cwd}</span>
          <br />${' '}
          {this.props.children}
          <div ref={this.scrollAnchor}></div>
        </div>
        <style jsx>
          {`
            h1 {
              color: green;
              font-size: 50px;
            }

            .terminal {
              padding: 16px;
              border: solid 2px gray;
              height: 300px;
              width: 100%;
              background-color: #333;
              color: white;
              overflow-y: auto;
            }

            .terminal__command,
            .terminal__path {
              width: 100%;
              overflow-wrap: break-word;
              white-space: pre-wrap;
            }

            .terminal__path {
              color: #00ff66;
            }

            .font--console {
              font-family: monospace, monospace;
              font-size: 0.8125rem;
            }

            .color--green {
              color: #00ff66;
            }
          `}
        </style>
      </>
    );
  }
}

export default TerminalUI;
