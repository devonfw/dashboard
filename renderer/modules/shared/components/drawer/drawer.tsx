import React from 'react';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useDawerStyles from './drawer.style';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Navigation from './navigation/navigation';
import DevonfwIdeSelector from '../../../shared/components/devonfw-ide-selector/DevonfwIdeSelector';
import Help from '../help/help';
import { StepperContext } from '../../../projects/redux/stepper/stepperContext';
import DevonfwIdeAccessibilty from '../devonfw-ide-accessibilty/devonfw-ide-accessibilty';

export default function Drawer(props: { children: JSX.Element }): JSX.Element {
  const classes = useDawerStyles();
  const router = useRouter().route;
  const { state } = useContext(StepperContext);

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
                {!state.projectData.path ? <DevonfwIdeAccessibilty /> : null}
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
