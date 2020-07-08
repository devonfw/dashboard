import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../hoc/Layout';
import SpaceAround from '../hoc/SpaceAround';
import CustomStepper from '../components/stepper/CustomStepper';
import { StepperProvider } from '../components/stepper/redux/stepperContext';

const useStyles = theme => ({
  container: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    marginRight: '1em',
    padding: '1em 2em;'
  },
  header: {
    paddingLeft: '1rem',
    color: '#495057',
    paddingTop: '1rem',
    marginBottom: '0',
    '& span': {
      color: '#0075B3'
    }
  }
});

class HelloElectron extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <h3 className={classes.header}><span>Projects > </span>New Project</h3>
        <SpaceAround bgColor={'#F4F6F8'}>
          <div className={classes.container}>
            <StepperProvider>
              <CustomStepper />
            </StepperProvider>
          </div>
        </SpaceAround>
      </Layout>
    );
  }
}

export default withStyles(useStyles)(HelloElectron);