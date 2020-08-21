import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const useRepositoryCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      width: '100%',
      marginBottom: '1rem',
      paddingTop: theme.spacing(4),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(3),
      '& .MuiCardActions-root, & .MuiCardContent-root': {
        padding: 0,
      },
    },
    buttonsRight: {
      justifyContent: 'flex-end',
    },
  })
);

export default useRepositoryCardStyles;
