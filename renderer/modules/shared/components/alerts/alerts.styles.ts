import { makeStyles } from '@material-ui/core/styles';

export const alertsStyles = makeStyles(() => ({
  alertRoot: {
    '& .MuiAlert-filledSuccess': {
      backgroundColor: '#4caf50 !important',
    },
    '& .MuiAlert-filledError': {
      backgroundColor: '#f44336 !important',
    },
    '& .MuiAlert-filledInfo': {
      backgroundColor: '#2196f3 !important',
    },
    '& .MuiAlert-filledWarning': {
      backgroundColor: '#ff9800 !important',
    },
  },
}));
