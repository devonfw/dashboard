import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const drawerWidth = '260px';

const useDawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.secondary.main,
      margin: '0 auto',
      overflowX: 'hidden',
      '& .MuiDrawer-paper': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.contrastText,
    },
    toolbar: {
      '&.MuiToolbar-gutters': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    title: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginLeft: 'auto !important',
      marginRight: 'auto !important',
    },
    logo: {
      height: 30,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginRight: 'auto',
    },
    topSpace: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      paddingTop: theme.spacing(4),
    },
    content: {
      flexGrow: 1,
      'min-height': '100vh',
      width: `calc(100% - ${drawerWidth})`,
      backgroundColor: '#F4F6F8',
      display: 'grid',
      gridTemplateRows: `fit-content(64px)`,
      gridTemplateColumns: '1fr',
    },
    ideSelector: {
      marginLeft: 'auto !important',
      marginRight: theme.spacing(2),
    },
  })
);

export default useDawerStyles;
