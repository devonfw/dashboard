import { Component } from 'react';
import { StepperContext } from '../../redux/stepper/stepperContext';
import STEPS_MAP from './StackSteps'

class DataStep extends Component {

  render() {
    let stack: string = this.context.state.stack;
    stack = stack ? stack : '';

    return (
      <>
        <div className="data-container">
          {STEPS_MAP[stack]}
        </div>
        <style jsx>
          {`
          .data-container {
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
          }
          `}
        </style>
      </>
    );
  }
}

DataStep.contextType = StepperContext;

export default DataStep;
