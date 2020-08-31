import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Layout from '../../modules/shared/hoc/Layout';
import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import CustomStepper from '../../modules/projects/components/Stepper/CustomStepper';
import Card from '@material-ui/core/Card/Card';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    header: {
      marginBottom: theme.spacing(4),
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
      <SpaceAround bgColor={'#F4F6F8'} top={1}>
        <>
          <h3 className={classes.header}>
            <span>Projects &gt;</span> New Project
          </h3>
          <Card className={classes.content}>
            <CustomStepper />
          </Card>
        </>
      </SpaceAround>
    </Layout>
  );
}
