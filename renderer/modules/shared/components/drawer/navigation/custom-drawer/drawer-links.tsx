import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export interface DrawerLink {
  id: number;
  section: string;
  sectionPath: string;
  icon: JSX.Element;
  submenu?: DrawerLink[];
}

export const drawerLinks: DrawerLink[] = [
  {
    id: 0,
    section: 'Home',
    sectionPath: '/home',
    icon: <HomeOutlinedIcon />,
  },
  {
    id: 1,
    section: 'Projects',
    sectionPath: '/projects',
    icon: <CreateNewFolderOutlinedIcon />,
  },
  {
    id: 2,
    section: `IDE's`,
    sectionPath: '/ides',
    icon: <DesktopWindowsOutlinedIcon />,
  },
  {
    id: 3,
    section: 'Repositories',
    sectionPath: '/repositories',
    icon: <StorageOutlinedIcon />,
  },
  {
    id: 5,
    section: 'Wiki',
    sectionPath: '/wiki',
    icon: <DescriptionOutlinedIcon />,
  },
  {
    id: 6,
    section: 'Settings',
    sectionPath: '',
    icon: <SettingsOutlinedIcon />,
    submenu: [
      {
        id: 7,
        section: 'Account settings',
        sectionPath: '/settings/account',
        icon: <AccountBoxIcon />,
      },
      {
        id: 8,
        section: 'Installed versions',
        sectionPath: '/settings/installed-versions',
        icon: <BuildOutlinedIcon />,
      },
    ],
  },
];
