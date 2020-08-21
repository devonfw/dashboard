import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useGridStyles = makeStyles((theme: Theme) =>
  createStyles({
    ideDetails: {
      minHeight: 100,
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '0px 3px 6px #00000029',
      borderRadius: '6px',
      display: 'flex',
      fontSize: '20px',
      justifyContent: 'space-evenly',
      color: theme.palette.primary.main,
      paddingTop: theme.spacing(2),
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
    projectInfo: {
      marginTop: theme.spacing(6),
      paddingRight: theme.spacing(8),
    },
    cardRoot: {
      display: 'flex',
      '& .MuiPaper-elevation1': {
        boxShadow: 'none',
      },
      '& .MuiPaper-root': {
        backgroundColor: 'transparent',
      },
    },
    cardCover: {
      width: 293,
      height: 197,
    },
  })
);
