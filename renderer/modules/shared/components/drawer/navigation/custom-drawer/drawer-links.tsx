import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Route from '../../../../models/route.model';
import HomeModule from '../../../../../home/home.module';
import IDEsModule from '../../../../../ides/ides.module';
import ProjectsModule from '../../../../../projects/projects-dashboard/projects.module';
import RepositoriesModule from '../../../../../repositories/repositories.module';
import AccountModule from '../../../../../settings/account/account.module';
import InstallationsModule from '../../../../../settings/installations/installations.module';

export const drawerLinks: Route[] = [
  HomeModule.route,
  ProjectsModule.route,
  IDEsModule.route,
  RepositoriesModule.route,
  {
    id: 5,
    section: 'Wiki',
    path: '/wiki',
    icon: <DescriptionOutlinedIcon />,
  },
  {
    id: 6,
    section: 'Settings',
    path: '',
    icon: <SettingsOutlinedIcon />,
    submenu: [AccountModule.route, InstallationsModule.route],
  },
];
