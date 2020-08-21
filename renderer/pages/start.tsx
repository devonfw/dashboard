import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import CustomStepper from '../modules/projects/components/Stepper/CustomStepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.secondary.main,
      marginRight: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
    },
    header: {
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
      marginBottom: 0,
      '& > span': {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default function Start(): JSX.Element {
  const classes = useStyles();

  return (
    <Layout>
      <>
        <h3 className={classes.header}>
          <span>Projects &gt;</span> New Project
        </h3>
        <SpaceAround bgColor={'#F4F6F8'}>
          <div className={classes.container}>
            <CustomStepper />
          </div>
        </SpaceAround>
      </>
    </Layout>
  );
}
