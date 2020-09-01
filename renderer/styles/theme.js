import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#0075B3',
      light: '#4CBDEC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#495057',
    },
    text: {
      primary: '#495057',
      secondary: '#495057',
    },
    error: {
      main: '#E01600',
    },
    success: {
      main: '#81CF08',
    },
  },
  overrides: {
    MuiTooltip: {
      arrow: {
        color: '#FFFFFF',
      },
      tooltip: {
        padding: '16px 32px',
        backgroundColor: '#FFFFFF',
        color: '#495057',
        maxWidth: 500,
        fontSize: '0.75rem',
        borderRadius: '8px',
      },
    },
  },
});

export default theme;
