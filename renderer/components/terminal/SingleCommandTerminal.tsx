import { Component } from 'react';
import Renderer from '../../services/renderer/renderer.service';
import TerminalUI from './terminal-ui/TerminalUI.controller';

export interface TerminalState {
  previous: Array<{ cwd: string; cmd: string }>;
  message: string;
}

export interface TerminalProps {
  initialCommand: string;
  initialCwd?: string;
}

export default class SingleCommandTerminal extends Component<
  TerminalProps,
  TerminalState
> {
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

  componentDidMount(): void {
    this.renderer.sendMultiple(
      'terminal/powershell',
      this.props.initialCommand,
      this.props.initialCwd
    );
  }

  componentWillUnmount(): void {
    this.renderer.removeAll();
  }

  handler = (_: unknown, message: string): void => {
    this.setState(
      (prevState: Readonly<TerminalState>, props: Readonly<TerminalProps>) => {
        const cwd = props.initialCwd ? props.initialCwd : '';
        const updatedMessage = `${prevState.message}${message}`;
        const executedCmd = `\$ ${props.initialCommand}\n${updatedMessage}`;
        const previousCmd = { cwd: cwd, cmd: executedCmd };
        const previous = [previousCmd];
        return { previous, message: updatedMessage };
      }
    );
  };

  render(): JSX.Element {
    let cwd = this.props.initialCwd;
    cwd = cwd ? cwd : '';

    return <TerminalUI previous={this.state.previous} cwd={cwd}></TerminalUI>;
  }
}
