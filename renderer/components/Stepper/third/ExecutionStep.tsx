import { Component } from 'react';
import SingleCommandTerminal from '../../terminal/SingleCommandTerminal';
import { StepperContext } from '../../redux/stepper/stepperContext';

class ExecutionStep extends Component {

    render() {
        let stackCmd = this.context.state.stackCmd;
        stackCmd = stackCmd ? stackCmd : '';

        let stackCwd = this.context.state.stackCwd;
        stackCwd = stackCwd ? stackCwd : '';

        let initialCommand = `${stackCmd}`
        let initialCwd = `${stackCwd}`

        return (
            <SingleCommandTerminal initialCommand={initialCommand} initialCwd={initialCwd}></SingleCommandTerminal>
        )
    }
}

ExecutionStep.contextType = StepperContext;

export default ExecutionStep;