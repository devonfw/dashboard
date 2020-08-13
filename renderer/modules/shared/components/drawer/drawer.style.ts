import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const drawerWidth = '260px';

const drawerStyle = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: '#FFFFFF',
      color: '#FFFFFF',
      margin: '0 auto',
      overflowX: 'hidden',
      '& .MuiDrawer-paper': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      },
      '& .MuiDrawer-root': {
        height: '100%',
      },
      '& .MuiAppBar-root': {
        margin: '0 auto',
      },
      '& .MuiAppBar-positionFixed': {
        right: 'auto',
      },
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#FFFFFF',
      backgroundColor: '#0075B3',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      paddingTop: '2em',
    },
    content: {
      flexGrow: 1,
      'min-height': '100vh',
      width: `calc(100% - ${drawerWidth})`,
      backgroundColor: '#F4F6F8',
    },
    fxEnd: {
      marginLeft: 'auto',
    },
    cardRoot: {
      display: 'flex',
      backgroundColor: 'none',
    },
    cardDetails: {
      display: 'flex',
      flexDirection: 'column',
      color: '#FFFFFF',
      '& .MuiPaper-root': {
        backgroundColor: '#0075B3',
      },
      '& .MuiPaper-elevation1': {
        boxShadow: 'none',
      },
    },
    cardContent: {
      padding: 19,
      marginLeft: '3.2em',
      backgroundColor: 'none',
      '& h6': {
        color: '#FFFFFF',
      },
    },
    cardCover: {
      width: 169,
      height: 32,
      position: 'relative',
      top: 17,
    },
  });

const responsiveDrawerStyle = makeStyles(drawerStyle);

export default responsiveDrawerStyle;
