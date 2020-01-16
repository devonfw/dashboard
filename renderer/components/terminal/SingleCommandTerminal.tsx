import {
  Component,
} from 'react';
import Renderer from '../../services/renderer.service';
import TerminalUI from './terminal-ui/TerminalUI.controller';

export interface TerminalState {
  previous: Array<{ cwd: string; cmd: string }>;
  message: string;
}

export interface TerminalProps {
  initialCommand: string;
  initialCwd?: string;
}

export default class SingleCommandTerminal extends Component<TerminalProps, TerminalState> {
  state = {
    previous: [],
    message: '',
  };

  renderer: Renderer;

  constructor(props: TerminalProps) {
    super(props);
    this.renderer = new Renderer();
    this.renderer.on('terminal/powershell', this.handler);
  }

  componentDidMount() {
    this.renderer.sendMultiple('terminal/powershell', this.props.initialCommand, this.props.initialCwd);
  }

  componentWillUnmount() {
    this.renderer.removeAll();
  }

  handler = (_: any, message: any) => {
    this.setState((prevState: Readonly<TerminalState>, props: Readonly<TerminalProps>) => {
      const cwd = props.initialCwd ? props.initialCwd : ''
      const updatedMessage = `${prevState.message}${message}`;
      const executedCmd = `\$ ${props.initialCommand}\n${updatedMessage}`;
      const previousCmd = { cwd: cwd, cmd: executedCmd };
      const previous = [previousCmd];
      return { previous, message: updatedMessage };
    });
  }

  render() {
    let cwd = this.props.initialCwd;
    cwd = cwd ? cwd : '';

    return (
      <TerminalUI
        previous={this.state.previous}
        cwd={cwd}
      ></TerminalUI>
    );
  }
}
