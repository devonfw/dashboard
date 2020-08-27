import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useBackgroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      backgroundColor: theme.palette.primary.light,
      backgroundImage: 'url("/static/assets/mask_logo.png")',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '460px 749px',
      backgroundPositionY: '1em',
    },
    dashboardInfo: {
      backgroundImage: 'none',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
      '@media (min-width: 1200px)': {
        backgroundImage: 'url("/static/assets/delivery-lifecycle.png")',
        backgroundSize: 'calc(700px * 0.8) calc(535px * 0.8)',
        backgroundPositionY: '20em',
      },
      '@media (min-width: 1450px)': {
        backgroundSize: '700px 535px',
        backgroundPositionY: '7em',
      },
    },
  })
);
