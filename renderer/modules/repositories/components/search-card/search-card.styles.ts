import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useSearchCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      marginBottom: '1rem',
      '& .MuiCardActions-spacing': {
        paddingTop: theme.spacing(4),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(3),
      },
      '& .MuiCardActions-spacing > *': {
        width: '100%',
      },
    },
  })
);

export default useSearchCardStyles;
