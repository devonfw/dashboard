import { makeStyles } from '@material-ui/core/styles';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import CustomStepper from '../modules/projects/components/Stepper/CustomStepper';
import { StepperProvider } from '../modules/projects/redux/stepperContext';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    marginRight: '1em',
    padding: '1em 2em;',
  },
  header: {
    paddingLeft: '1rem',
    color: '#495057',
    paddingTop: '1rem',
    marginBottom: '0',
    '& span': {
      color: '#0075B3',
    },
  },
});

export default function Start(): JSX.Element {
  const classes = useStyles();

  return (
    <Layout>
      <>
        <h3 className={classes.header}>
          <span>Projects &gt;</span>New Project
        </h3>
        <SpaceAround bgColor={'#F4F6F8'}>
          <div className={classes.container}>
            <StepperProvider>
              <CustomStepper />
            </StepperProvider>
          </div>
        </SpaceAround>
      </>
    </Layout>
  );
}
