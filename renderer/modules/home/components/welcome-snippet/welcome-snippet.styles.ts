import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

const useWelcomeSnippetStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(4),
    },
    description: {
      fontWeight: theme.typography.fontWeightRegular,
      marginBottom: theme.spacing(3),
    },
    link: {
      cursor: 'pointer',
    },
    links: {
      marginBottom: theme.spacing(5),
    },
  })
);

export default useWelcomeSnippetStyles;
