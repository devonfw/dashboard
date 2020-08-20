import makeStyles from '@material-ui/core/styles/makeStyles';

export const useBackgroundStyles = makeStyles({
  root: {
    height: '100%',
    backgroundColor: '#4CBDEC',
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
});
