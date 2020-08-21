import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useDashboardDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    ideDetails: {
      minHeight: 100,
      backgroundColor: theme.palette.primary.contrastText,
      boxShadow: '0px 3px 6px #00000029',
      borderRadius: '6px',
      display: 'flex',
      fontSize: '20px',
      justifyContent: 'space-evenly',
      color: theme.palette.primary.main,
      paddingTop: '1em',
      marginTop: '2em',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 300,
      },
    },
    showChartIcon: {
      fontWeight: 'bold',
      color: theme.palette.primary.light,
    },
    projectDetails: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.primary.main,
      width: '60%',
    },
  })
);
