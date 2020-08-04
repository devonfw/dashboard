import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { StepperContext } from '../redux/stepperContext';
import STEPS_MAP from './StackSteps';

const useStyles = () => ({
  dataContainer: {
    display: 'flex',
    marginBottom: '2em',
    '& .MuiCard-root': {
      height: '200px',
      padding: 0,
    },
    '& .MuiCardActionArea-root': {
      height: '100%',
    },
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
    let stack: string = this.context.state.stack;
    stack = stack ? stack : '';

    return (
      <>
        <div className={classes.dataContainer}>{STEPS_MAP[stack]}</div>
      </>
    );
  }
}

DataStep.contextType = StepperContext;

export default withStyles(useStyles)(DataStep);