import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useModulesInstallerStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.error.main,
    },
    terminal: {
      padding: theme.spacing(2),
      border: 'solid 2px gray',
      height: '300px',
      width: '100%',
      backgroundColor: theme.palette.secondary.contrastText,
      color: theme.palette.primary.contrastText,
      overflowY: 'auto',
    },
    line: {
      whiteSpace: 'pre-wrap',
    },
  })
);
