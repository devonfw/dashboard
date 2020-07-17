import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import responsiveDrawerStyle from './responsiveDrawer.style';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AlertIcon from '../notifications/alert-icon/AlertIcon';
import Navigation from './navigation/Navigation';
import NotificationsDialog from '../notifications/Notifications';
import { NotificationsProvider } from '../notifications/redux/NotificationsContext';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default function ResponsiveDrawer(props: {
  children: JSX.Element;
  title?: string;
}): JSX.Element {
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
            <div className={classes.cardDetails}>
              <Card className={classes.cardRoot}>
                <CardMedia
                  className={classes.cardCover}
                  image="/assets/devon.png"
                  title="Devon"
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="h6" noWrap>
                    {props.title ? props.title : 'Devonfw Dashboard'}
                  </Typography>
                </CardContent>
              </Card>
            </div>

            <Tooltip title="Notifications" className={classes.fxEnd}>
              <IconButton
                color="inherit"
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
