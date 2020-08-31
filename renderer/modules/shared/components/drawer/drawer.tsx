import React from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useDawerStyles from './drawer.style';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navigation from './navigation/navigation';
import DevonfwIdeSelector from '../../../shared/components/devonfw-ide-selector/DevonfwIdeSelector';
import Help from '../help/help';

export default function Drawer(props: { children: JSX.Element }): JSX.Element {
  const classes = useDawerStyles();
  const router = useRouter().route;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src="/static/assets/devonfw.svg"
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
                <Help />
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
