import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useChangelogStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      '& a': {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.secondary.contrastText,
        textDecoration: 'none',
      },
    },
  })
);
