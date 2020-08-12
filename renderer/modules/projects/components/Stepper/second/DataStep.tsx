import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import STEPS_MAP from './StackSteps';

const useStyles = () => ({
  dataContainer: {
    display: 'flex',
    marginBottom: '2em',
  },
});

interface DataStepProps {
  classes: {
    dataContainer: string;
  };
}
class DataStep extends Component<DataStepProps> {
  render(): JSX.Element {
    const { classes } = this.props;
    const stack: string = this.context.state.projectData.type;

    return (
      <>
        <div className={classes.dataContainer}>{STEPS_MAP[stack]}</div>
      </>
    );
  }
}

DataStep.contextType = StepperContext;

export default withStyles(useStyles)(DataStep);
