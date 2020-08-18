import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import responsiveDrawerStyle from './drawer.style';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Navigation from './navigation/navigation';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DevonfwIdeSelector from '../../../projects/components/Stepper/second/angular/ng-data/DevonfwIdeSelector';

export default function Drawer(props: { children: JSX.Element }): JSX.Element {
  const classes = responsiveDrawerStyle();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.cardDetails}>
            <Card className={classes.cardRoot}>
              <CardMedia
                className={classes.cardCover}
                image="/assets/devon.png"
                title="Devon"
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" noWrap>
                  Devonfw Dashboard
                </Typography>
              </CardContent>
            </Card>
          </div>
          <DevonfwIdeSelector />

          <Tooltip title="Help" className={classes.fxEnd}>
            <IconButton color="inherit" aria-label="Help">
              <HelpOutlineIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Navigation classes={classes} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
