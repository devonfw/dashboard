import HomeHelp from './components/home-help/home-help';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import Module from '../shared/models/module.model';

const route = {
  id: 0,
  section: 'Home',
  path: '/home',
  icon: <HomeOutlinedIcon />,
};

const help = (): JSX.Element => <HomeHelp></HomeHelp>;

const HomeModule: Module = { route, help };

export default HomeModule;
