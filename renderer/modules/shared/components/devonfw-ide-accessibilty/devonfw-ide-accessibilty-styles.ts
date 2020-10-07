import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const devonfwIdeAccessibilityStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,
      borderRadius: '1em',
      border: 'none',
      boxShadow: theme.shadows[3],
      position: 'relative',
    },
    popperRoot: {
      zIndex: 9999,
      maxWidth: '25%',
      minWidth: 200,
      margin: 'auto',
    },
    arrowUp: {
      width: 0,
      height: 0,
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      borderBottom: '15px solid white',
      position: 'absolute',
      top: '-13px',
      left: '46%',
    },
  })
);

export default devonfwIdeAccessibilityStyles;
