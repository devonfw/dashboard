import { Component } from 'react';
import { Button } from '@material-ui/core';
import { StepperContext } from '../../../modules/projects/components/Stepper/redux/stepperContext';
import EXECTUION_CONTANTS from './ExecutionContants';

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
        <div>{EXECTUION_CONTANTS.INSTALLATION_MESSAGES.install_packages}</div>
        <div className="action">
          <div>
            <Button variant="outlined" onClick={this.props.cancelInstallation}>
              {EXECTUION_CONTANTS.cancel}
            </Button>
          </div>
          <Button
            style={{ backgroundColor: '#0075B3' }}
            size="small"
            variant="contained"
            color="primary"
            onClick={this.props.installEventHandler}
          >
            {EXECTUION_CONTANTS.proceed}
          </Button>
        </div>
      </div>
    );
  }
}
