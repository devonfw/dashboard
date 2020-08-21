import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useIdeCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      paddingTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    media: {
      height: 120,
    },

    containImg: {
      backgroundSize: 'contain',
      marginTop: 0,
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(2),
    },
  })
);

export default useIdeCardStyles;
