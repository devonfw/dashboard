import Drawer from '../../modules/shared/components/drawer/drawer';
import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import ProfileSetup from '../../modules/intro/components/profile-setup/profile-setup';
import Background from '../../modules/home/components/background/background';

export default function Account(): JSX.Element {
  return (
    <Drawer>
      <Background>
        <SpaceAround>
          <ProfileSetup accept="Accept" cancel="Cancel"></ProfileSetup>
        </SpaceAround>
      </Background>
    </Drawer>
  );
}
