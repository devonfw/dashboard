import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const useWelcomeSnippetStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.contrastText,
      marginBottom: theme.spacing(4),
    },
    description: {
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.primary.contrastText,
      marginBottom: theme.spacing(3),
    },
    link: {
      cursor: 'pointer',
    },
    links: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.contrastText,
    },
  })
);

export default useWelcomeSnippetStyles;
