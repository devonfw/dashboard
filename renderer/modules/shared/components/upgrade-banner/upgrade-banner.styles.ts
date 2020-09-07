import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useUpgradeBannerStyles = makeStyles((theme: Theme) =>
  createStyles({
    updateAction: {
      '& a': {
        marginTop: theme.spacing(2),
      },
    },
    upgrade: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    uppercase: {
      textTransform: 'uppercase',
      marginBottom: theme.spacing(0.25),
      display: 'flex',
      justifyContent: 'space-between',
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
        position: 'relative',
        top: '-1px',
      },
    },
  })
);
