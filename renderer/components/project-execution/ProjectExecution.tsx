import { Component } from 'react';
import ProjectExecutionUIView from './projectExecution-ui/ProjectExecutionUI.view';
import Renderer from '../../services/renderer/renderer.service';

export interface ExecutionState {
  message: string;
}

export interface ExecutionProps {
  initialCommand: string;
  initialCwd?: string;
  projectDetails?: {
    name: string;
    domain: string;
  };
  children?: JSX.Element;
}

export default class ProjectExecution extends Component<
  ExecutionProps,
  ExecutionState
> {
  state = {
    message: '',
  };

  renderer: Renderer;

  constructor(props: ExecutionProps) {
    super(props);
    this.renderer = new Renderer();
    this.renderer.on('terminal/powershell', this.handler);
    this.processCommand = this.processCommand.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount(): void {
    this.processCommand();
  }

  processCommand(): void {
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

  resetState(): void {
    this.handler(null, '');
  }

  handler = (_: never, message: string): void => {
    console.log(message);
    this.setState({
      message: message,
    });
  };

  render(): JSX.Element {
    return (
      <ProjectExecutionUIView
        message={this.state.message}
        installationPath={`${this.props.initialCwd}\\${this.props.projectDetails.name}`}
        type={this.props.projectDetails.domain}
        processCommand={this.processCommand}
        resetState={this.resetState}
      ></ProjectExecutionUIView>
    );
  }
}
