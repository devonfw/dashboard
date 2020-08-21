import { Component } from 'react';
import { Button } from '@material-ui/core';
import EXECUTION_CONTANTS from './ExecutionContants';
import { StepperContext } from '../../../modules/projects/redux/stepper/stepperContext';

interface IstallationProps {
  installEventHandler: () => void;
  cancelInstallation: () => void;
}

export default class InstallationGuide extends Component<IstallationProps> {
  static contextType = StepperContext;
  setActiveState = (): void => {
    this.context.dispatch({
      type: 'RESET_STEP',
    });
  };

  render(): JSX.Element {
    return (
      <div className="installation">
        <div>{EXECUTION_CONTANTS.INSTALLATION_MESSAGES.install_packages}</div>
        <div className="action">
          <div>
            <Button variant="outlined" onClick={this.props.cancelInstallation}>
              {EXECUTION_CONTANTS.cancel}
            </Button>
          </div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={this.props.installEventHandler}
          >
            {EXECUTION_CONTANTS.proceed}
          </Button>
        </div>
      </div>
    );
  }
}
