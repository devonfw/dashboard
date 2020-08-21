import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useSectionLinkStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);
