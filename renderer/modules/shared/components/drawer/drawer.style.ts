import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const drawerWidth = '260px';

const useDawerStyles = makeStyles((theme: Theme) =>
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
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#FFFFFF',
      backgroundColor: '#0075B3',
    },
    toolbar: {
      '&.MuiToolbar-gutters': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    title: {
      paddingLeft: theme.spacing(6),
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    logo: {
      height: 30,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    topSpace: theme.mixins.toolbar,
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
    ideSelector: {
      marginRight: theme.spacing(2),
      width: '500px',
      padding: '1em 0 !important',
      '& .MuiSelect-select:focus': {
        backgroundColor: 'transparent',
      },
    },
    dashboard: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      marginLeft: theme.spacing(2),
    },
  })
);

export default useDawerStyles;
