import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const useAccordionStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    installation: {
      paddingTop: theme.spacing(4),
    },
    summary: {
      '& .MuiAccordionSummary-content': {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0,
      },
    },
    success: {
      color: theme.palette.success.main,
    },
    details: {
      display: 'block',
      background: '#F6F6F6',
    },
    accept: {
      marginLeft: theme.spacing(1),
    },
    cancel: {
      marginRight: theme.spacing(1),
    },
    noPad: {
      padding: 0,
    },
  })
);
