import { Component } from 'react'
import { Button } from '@material-ui/core';
import { StepperContext } from '../../Stepper/redux/stepperContext';

interface IstallationProps {
    installEventHandler: () => void,
    cancelInstallation: () => void
}

export default class InstallationGuide extends Component<IstallationProps> {
    static contextType = StepperContext;
    setActiveState = (): void => {
        this.context.dispatch({
          type: 'RESET_STEP',
        });
    };

    render() {
        return (
            <div className='installation'>
                <div>Do you want to install Packages? (Click "Proceed" to continue)</div>
                <div className='action'>
                    <div>
                        <Button variant="outlined" onClick={this.props.cancelInstallation}>
                        CANCEL
                        </Button>
                </div>
                <Button
                    style={{backgroundColor: '#0075B3'}}
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick= {this.props.installEventHandler}
                >
                    PROCEED
                </Button>
                </div>
            </div>
        )
    }
}
