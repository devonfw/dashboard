import Module from '../shared/models/module.model';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import RepositoriesHelp from './components/repositories-help/repositories-help';

const route = {
  id: 3,
  section: 'Repositories',
  path: '/repositories',
  icon: <StorageOutlinedIcon />,
};

const help = (): JSX.Element => <RepositoriesHelp />;

const RepositoriesModule: Module = { route, help };

export default RepositoriesModule;
