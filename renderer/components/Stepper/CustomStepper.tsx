import { Component, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import MaterialStepper, { StepObject } from './MaterialStepper';
import TypeStep from './first/TypeStep';
import DataStep from './second/DataStep';
import { StepperContext } from './redux/stepperContext';
import ExecutionStep from './third/ExecutionStep';

class CustomStepper extends Component {
  steps: StepObject[] = [
    {
      title: 'Project type',
      content: 'Project type',
      stepJSX: <TypeStep></TypeStep>,
    },
    {
      title: 'Project data',
      content: 'Project data',
      stepJSX: <DataStep></DataStep>,
    },
    {
      title: 'Execute commands',
      content: 'Execute commands',
      stepJSX: <ExecutionStep></ExecutionStep>,
    },
  ];

  render() {
    let activeStep = this.context.state.activeStep;
    activeStep = activeStep ? activeStep : 0;

    return (
      <>
        <MaterialStepper steps={this.steps} />
          <p style={{color: '#495057', 'paddingBottom': '2rem'}}>
            Choose the technology in the below section, dolor sit amet, consectetur adipiscing elit.
            Phasellus non tincidunt velit. Quisque laoreet, lectus id tincidunt fringilla, eros est bibendum felis,
            sit amet lobortis ante sem non diam. Donec viverra a nisi eu eleifend.
            Mauris vel leo tempor, commodo felis in, sollicitudin velit.
          </p>
        {this.steps[activeStep].stepJSX}
        { !activeStep ? 
          <Link href="/projects">
            <div style={{marginTop: '4em'}}>
                <Button variant="outlined">Back</Button>
            </div>
          </Link>
           : null
        }
      </>
    );
  }
}

CustomStepper.contextType = StepperContext;

export default CustomStepper;
