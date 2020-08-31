import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Module from '../../shared/models/module.model';
import InstallationsHelp from './components/installations-help/installations-help';

const route = {
  id: 8,
  section: 'Installed versions',
  path: '/settings/installed-versions',
  icon: <BuildOutlinedIcon />,
};

const help = (): JSX.Element => <InstallationsHelp />;

const InstallationsModule: Module = { route, help };

export default InstallationsModule;
