import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountHelp from './components/account-help/account-help';
import Module from '../../shared/models/module.model';

const route = {
  id: 7,
  section: 'Account settings',
  path: '/settings/account',
  icon: <AccountBoxIcon />,
};

const help = (): JSX.Element => <AccountHelp />;

const AccountModule: Module = { route, help };

export default AccountModule;
