import { useContext } from 'react';
import Badge from '@material-ui/core/Badge';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import { NotificationsContext } from '../redux/NotificationsContext';

export default function() {
  const { state } = useContext(NotificationsContext);

  return (
    <Badge color="secondary" badgeContent={state.notifications.length}>
      <NotificationsNone />
    </Badge>
  );
}
