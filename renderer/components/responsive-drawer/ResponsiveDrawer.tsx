import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import responsiveDrawerStyle from './ResponsiveDrawer.style';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AlertIcon from '../notifications/alert-icon/AlertIcon';
import Navigation from './navigation/Navigation';
import NotificationsDialog from '../notifications/Notifications';
import { NotificationsProvider } from '../notifications/redux/NotificationsContext';

export default function ResponsiveDrawer(props: {
  children: any;
  title?: string;
}) {
  const classes = responsiveDrawerStyle();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleReadNotifications = () => {
    setOpen((prevState) => {
      const opened = prevState;
      return !opened;
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <NotificationsProvider>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {props.title ? props.title : 'devonfw dashboard'}
            </Typography>
            <Tooltip title="Notifications" className={classes.fxEnd}>
              <IconButton
                aria-label="Notifications"
                onClick={handleReadNotifications}
              >
                <AlertIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <NotificationsDialog open={open} />
        </AppBar>

        <Navigation
          classes={classes}
          mobileOpen={mobileOpen}
          drawerToggle={handleDrawerToggle}
        />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </NotificationsProvider>
  );
}
