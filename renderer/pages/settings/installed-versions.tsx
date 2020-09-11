import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import Installations from '../../modules/settings/installations/components/Installations/Installations.contoller';

export default function InstalledVersions(): JSX.Element {
  return (
    <SpaceAround bgcolor={'#f4f6f8'}>
      <Installations></Installations>
    </SpaceAround>
  );
}
