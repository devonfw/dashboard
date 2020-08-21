import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useBackgroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      backgroundColor: theme.palette.primary.light,
      backgroundImage: 'url("/assets/mask_logo.png")',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '460px 749px',
      backgroundPositionY: '1em',
    },
    dashboardInfo: {
      backgroundImage: 'url("/assets/delivery-lifecycle.png")',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '700px 535px',
      backgroundPositionY: '7em',
    },
  })
);
