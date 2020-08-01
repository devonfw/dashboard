import { Component } from 'react';
import { StepperContext } from '../redux/stepperContext';
import ProjectExecution from '../../project-execution/ProjectExecution';

class ExecutionStep extends Component {
  render(): JSX.Element {
    
    let stackCmd = this.context.state.stackCmd;
    stackCmd = stackCmd ? stackCmd : '';

    let stackCwd = this.context.state.stackCwd;
    stackCwd = stackCwd ? stackCwd : '';

    let projectDetails = this.context.state.projectDetails;
    projectDetails = projectDetails ? projectDetails : '';

    const initialCommand = `${stackCmd}`;
    const initialCwd = `${stackCwd}`;

    return (
      <ProjectExecution
        initialCommand={initialCommand}
        initialCwd={initialCwd}
        projectDetails={projectDetails}
      ></ProjectExecution>
    );
  }
}

ExecutionStep.contextType = StepperContext;

export default ExecutionStep;
