import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import Background from '../../modules/home/components/background/background';
import UserAccount from '../../modules/settings/account/components/user-account';

export default function Account(): JSX.Element {
  return (
    <Background>
      <SpaceAround>
        <UserAccount />
      </SpaceAround>
    </Background>
  );
}
