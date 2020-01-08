import { Component } from 'react';
import { StepperContext } from '../../redux/stepperContext';
import NgData from './angular/NgData';
import NgType from '../first/angular/NgType';
import JavaType from '../first/java/JavaType';
import NodeType from '../first/node/NodeType';


const ngStep = () => (
  <>
    <NgType></NgType>
    <NgData></NgData>
  </>
);

const javaStep = () => (
  <>
    <JavaType></JavaType>
    <NgData></NgData>
  </>
);

const nodeStep = () => (
  <>
    <NodeType></NodeType>
    <NgData></NgData>
  </>
);

class DataStep extends Component {

  getStep = (stack: string) => {
    if (stack == 'ng') {
      return ngStep();
    }

    if (stack == 'java') {
      return javaStep();
    }

    if (stack == 'node') {
      return nodeStep();
    }

    return null;
  };

  render() {
    let stack = this.context.state.stack;
    stack = stack ? stack : '';

    return (
      <>
        <div className="data-container">
          {this.getStep(stack)}
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
