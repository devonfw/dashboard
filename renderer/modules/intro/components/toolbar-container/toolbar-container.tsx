import { useState } from 'react';
import Background from '../../../home/components/background/background';
import LandingPage from '../landing-page/landing-page';
import ProfileSetup from '../profile-setup/profile-setup';
import useToolbarStyles from './toolbar-container.style';

const ToolbarContainer = (): JSX.Element => {
  const [displayProfileForm, setDisplayProfileForm] = useState(false);

  const classes = useToolbarStyles();

  const navigateHandler = () => {
    setDisplayProfileForm(true);
  };
  return (
    <div>
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
