import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
const drawerWidth = 260;

const drawerStyle = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: '#4CBDEC',
      color: '#FFFFFF'
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
      backgroundColor: '#0075B3'
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
      marginTop: '2em'
    },
    content: {
      flexGrow: 1,
      'min-height': '100vh',
      backgroundColor: '#4CBDEC',
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
        backgroundColor: '#0075B3'
      },
      '& .MuiPaper-elevation1': {
        boxShadow: 'none'
      }
    },
    cardContent: {
      padding: 19,
      marginLeft: '3.2em',
      backgroundColor: 'none',
      '& h6': {
        color: '#FFFFFF'
      }
    },
    cardCover: {
      width: 169,
      height: 32,
      position: 'relative',
      top: 17,
    },
    customDrawerContainer: {
      '& .MuiPaper-elevation1': {
        boxShadow: 'none'
      },
      '& .MuiPaper-root': {
        backgroundColor: 'transparent'
      }
    },
    customDrawerRoot: {
      display: 'flex',
      flex: '1 0 auto'
    },
    customDrawerContent: {
      flex: '1 0 auto'
    },
    customDrawerCover: {
      width: 94,
      height: 94
    },
    user: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px'
    },
    updateAction: {
      '& button': {
        marginTop: '16px',
        backgroundColor: '#0075B3',
        color: '#FFFFFF'
      },
      '& .MuiButton-containedPrimary': {
        backgroundColor: '#0075B3'
      }
    },
    upgrade: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2em',
      marginBottom: '5em'
    },
    uppercase: {
      textTransform: 'uppercase',
      marginBottom: 2,
      display: 'flex',
      justifyContent: 'space-between',
      '& .MuiSvgIcon-root': {
        color: '#0075B3',
        position: 'relative',
        top: '-1px'
      }
    }
  });

const responsiveDrawerStyle = makeStyles(drawerStyle)

export default responsiveDrawerStyle;