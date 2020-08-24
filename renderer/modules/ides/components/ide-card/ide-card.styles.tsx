import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useIdeCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    media: {
      height: 88,
    },
    actions: {
      justifyContent: 'center',
    },
    containImg: {
      backgroundSize: 'contain',
      maxWidth: '25%',
      margin: 'auto',
    },
  })
);

export default useIdeCardStyles;
