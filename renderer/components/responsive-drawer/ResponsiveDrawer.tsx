import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import responsiveDrawerStyle from './ResponsiveDrawer.style';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import Navigation from './navigation/Navigation';
import ConfirmationDialog from '../notifications/Notifications'


export default function ResponsiveDrawer(props: {
  children: any;
  title?: string;
}) {
  const classes = responsiveDrawerStyle();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
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
            <IconButton aria-label="Notifications">
              <Badge color="secondary" badgeContent={1}>
                <NotificationsNone />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
        <ConfirmationDialog />
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
  );
}
