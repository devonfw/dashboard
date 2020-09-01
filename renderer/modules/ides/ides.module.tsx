import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import Module from '../shared/models/module.model';

const route = {
  id: 2,
  section: `IDE's`,
  path: '/ides',
  icon: <DesktopWindowsOutlinedIcon />,
};

const help = (): JSX.Element => <>No help available</>;

const IDEsModule: Module = { route, help };

export default IDEsModule;
