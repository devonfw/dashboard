import { Component } from 'react';
import SingleCommandTerminal from '../../terminal/SingleCommandTerminal';
import { StepperContext } from '../redux/stepperContext';

class ExecutionStep extends Component {
  render(): JSX.Element {
    let stackCmd = this.context.state.stackCmd;
    stackCmd = stackCmd ? stackCmd : '';

    let stackCwd = this.context.state.stackCwd;
    stackCwd = stackCwd ? stackCwd : '';

    const initialCommand = `${stackCmd}`;
    const initialCwd = `${stackCwd}`;

    return (
      <SingleCommandTerminal
        initialCommand={initialCommand}
        initialCwd={initialCwd}
      ></SingleCommandTerminal>
    );
  }
}

ExecutionStep.contextType = StepperContext;

export default ExecutionStep;
