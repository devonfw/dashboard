import { Component } from 'react';
import ProjectExecutionUIView from './projectExecution-ui/ProjectExecutionUI.view'
import Renderer from '../../services/renderer/renderer.service';
import MainMessage from '../../models/main-message';

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

  handler = (_: never, message: string): void => {
    console.log(message);
    this.setState({
      message: message
    });
  };

  render(): JSX.Element {
    return ( <ProjectExecutionUIView message={this.state.message} installationPath={`${this.props.initialCwd}\\${this.props.projectDetails.name}`} type={this.props.projectDetails.domain}>
    </ProjectExecutionUIView> );
  }
}
