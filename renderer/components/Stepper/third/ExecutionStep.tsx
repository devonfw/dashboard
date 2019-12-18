import { Component } from 'react';
import SingleCommandTerminal from '../../terminal/SingleCommandTerminal';

class ExecutionStep extends Component{

    render() {

        return (
            <SingleCommandTerminal initialCommand={'devon --help'}></SingleCommandTerminal>
        )
    }
}

export default ExecutionStep;