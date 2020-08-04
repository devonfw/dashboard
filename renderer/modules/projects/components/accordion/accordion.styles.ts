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
      paddingTop: 32,
    },
    summary: {
      '& .MuiAccordionSummary-content': {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0,
      },
    },
    error: {
      color: '#E01600',
    },
    success: {
      color: '#81CF08',
    },
    details: {
      display: 'block',
      background: '#F6F6F6',
    },
    accept: {
      marginLeft: 8,
    },
    cancel: {
      marginRight: 8,
    },
  })
);
