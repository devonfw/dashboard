import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Background from '../../../home/components/background/background';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import LandingPage from '../LandingPage/LandingPage';
import ProfileSetup from '../ProfileSetup/ProfileSetup';

const ToolbarContainer = (): JSX.Element => {
  const [displayProfileForm, setDisplayProfileForm] = useState(false);

  const toolbarStyle = (theme: Theme) =>
    createStyles({
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#0075B3',
      },
      logo: {
        width: 169,
        height: 32,
      },
      pageContent: {
        minHeight: '100vh',
      },
    });

  const useStyles = makeStyles(toolbarStyle);
  const classes = useStyles();
  const navigateHandler = () => {
    setDisplayProfileForm(true);
  };
  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img className={classes.logo} src="/assets/devon-log.svg" />
        </Toolbar>
      </AppBar>

      <Background>
        <div className={classes.pageContent}>
          {displayProfileForm ? (
            <ProfileSetup></ProfileSetup>
          ) : (
            <LandingPage navigateHandler={navigateHandler}></LandingPage>
          )}
        </div>
      </Background>
    </div>
  );
};

export default ToolbarContainer;
