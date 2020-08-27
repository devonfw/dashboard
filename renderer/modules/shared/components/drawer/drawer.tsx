import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import useDawerStyles from './drawer.style';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Navigation from './navigation/navigation';
import DevonfwIdeSelector from '../../../shared/components/devonfw-ide-selector/DevonfwIdeSelector';

export default function Drawer(props: { children: JSX.Element }): JSX.Element {
  const classes = useDawerStyles();
  const router = useRouter().route;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src="/assets/devonfw.svg"
            alt="devonfw logo"
            className={classes.logo}
          />
          {router !== '/intro' ? (
            <div className={classes.dashboard}>
              <Typography variant="h6" className={classes.title} noWrap>
                Dashboard
              </Typography>
              <div className={classes.ideTools}>
                <DevonfwIdeSelector className={classes.ideSelector} />
                <Tooltip title="Help">
                  <IconButton color="inherit" aria-label="Help">
                    <HelpOutlineIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ) : null}
        </Toolbar>
      </AppBar>

      {router !== '/intro' ? <Navigation classes={classes} /> : null}
      <main className={classes.content}>
        <div className={classes.topSpace} />
        {props.children}
      </main>
    </div>
  );
}
