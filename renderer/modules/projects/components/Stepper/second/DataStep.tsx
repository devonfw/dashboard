import { useContext } from 'react';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import { Stack, stacksMap, stacksJSXMap, Technologies } from '../first/stacks';
import { Grid } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import StackCard from '../../stack-card/StackCard';

const useDataStepStyles = makeStyles({
  dataContainer: {
    display: 'flex',
    marginBottom: '2em',
  },
});

export default function DataStep(): JSX.Element {
  const classes = useDataStepStyles();
  const { state } = useContext(StepperContext);
  const technologies: Technologies = state.projectData.type as Technologies;
  const stack: Stack = stacksMap[technologies];

  return (
    <div className={classes.dataContainer}>
      <Grid container spacing={6}>
        <Grid item xs={5} md={3} lg={3} xl={2}>
          <StackCard
            variant={true}
            image={stack.image}
            text={stack.text}
          ></StackCard>
        </Grid>
        <Grid item xs={7} md={8} lg={7} xl={6}>
          {stacksJSXMap[technologies]}
        </Grid>
      </Grid>
    </div>
  );
}
