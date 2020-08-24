import { useContext } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { StepperContext } from '../modules/projects/redux/stepper/stepperContext';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import ides from '../modules/ides/ides';
import IdeCard from '../modules/ides/components/ide-card/ide-card';
import TitleCounter from '../modules/shared/components/title-counter/title-counter';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      paddingBottom: theme.spacing(4),
    },
    cardsContainer: {
      display: 'grid',
      gridGap: 16,
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    },
  })
);

export default function IDES(): JSX.Element {
  const classes = useStyles();
  const { state } = useContext(StepperContext);

  return (
    <Layout>
      <SpaceAround>
        <>
          <TitleCounter count={ides.length} className={classes.header}>
            Projects
          </TitleCounter>
          <div className={classes.cardsContainer}>
            {ides.map((ide) => (
              <IdeCard
                key={ide.name}
                devonfwIde={state.projectData.path}
                {...ide}
              />
            ))}
          </div>
        </>
      </SpaceAround>
    </Layout>
  );
}
