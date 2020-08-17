import Drawer from '../../modules/shared/components/drawer/drawer';
import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import Installations from '../../components/Installations/Installations.contoller';

export default function InstalledVersions(): JSX.Element {
  return (
    <Drawer>
      <SpaceAround bgColor={'#f4f6f8'}>
        <Installations></Installations>
      </SpaceAround>
    </Drawer>
  );
}
