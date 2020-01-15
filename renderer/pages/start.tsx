import { Component } from 'react';
import Layout from '../hoc/Layout';
import SpaceAround from '../hoc/SpaceAround';
import CustomStepper from '../components/Stepper/CustomStepper';
import { StepperProvider } from '../components/redux/stepper/stepperContext';

class HelloElectron extends Component {

  render() {
    return (
      <Layout>
        <SpaceAround>
          <h1>New Project</h1>
          <p>In this window you can create a new project step by step</p>
          <StepperProvider>
            <CustomStepper/>
          </StepperProvider>
        </SpaceAround>
      </Layout>
    );
  }
}

export default HelloElectron;