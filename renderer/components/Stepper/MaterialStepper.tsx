import { Component } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { StepperContext } from '../redux/stepperContext';
export interface StepObject {
  title: string;
  content: string;
  stepJSX: JSX.Element | null;
}

interface StepperProps {
  steps: StepObject[];
}

class MaterialStepper extends Component<StepperProps> {
  getStep(step: StepObject) {
    return (
      <Step key={step.title}>
        <StepLabel>{step.title}</StepLabel>
      </Step>
    );
  }

  render() {
    return (
      <div className={'root'}>
        <Stepper activeStep={this.context.state.activeStep} alternativeLabel>
          {this.props.steps.map((step: StepObject) => this.getStep(step))}
        </Stepper>
        <style jsx>
          {`
            .root {
              width: 100%;
              margin-top: 4rem;
              margin-bottom: 1rem;
            }
          `}
        </style>
      </div>
    );
  }
}

MaterialStepper.contextType = StepperContext;

export default MaterialStepper;
