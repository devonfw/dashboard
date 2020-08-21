import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useProfilePictureStyles = makeStyles((theme: Theme) =>
  createStyles({
    customDrawerContainer: {
      '& .MuiPaper-elevation1': {
        boxShadow: 'none',
      },
      '& .MuiPaper-root': {
        backgroundColor: 'transparent',
      },
    },
    customDrawerRoot: {
      display: 'flex',
      flex: '1 0 auto',
    },
    customDrawerContent: {
      flex: '1 0 auto',
    },
    customDrawerCover: {
      width: 94,
      height: 94,
      borderRadius: '50%',
      marginLeft: theme.spacing(3),
    },
    user: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',
    },
    role: {
      lineHeight: 1,
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
  })
);
