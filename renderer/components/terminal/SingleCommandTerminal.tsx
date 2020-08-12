import { Component } from 'react';
import Renderer from '../../modules/shared/services/renderer/renderer.service';
import TerminalUI from './terminal-ui/TerminalUI.controller';
import MainMessage from '../../models/main-message';

export interface TerminalState {
  previous: Array<{ cwd: string; cmd: string }>;
  message: string;
}

export interface TerminalProps {
  initialCommand: string;
  initialCwd?: string;
  projectDetails?: {
    name: string;
    domain: string;
  };
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
      this.props.projectDetails,
      this.props.initialCommand,
      this.props.initialCwd
    );
  }

  componentWillUnmount(): void {
    this.renderer.removeAll();
  }

  handler = (_: never, message: MainMessage<string>): void => {
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
