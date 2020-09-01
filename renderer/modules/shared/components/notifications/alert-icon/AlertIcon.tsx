import { useContext } from 'react';
import Badge from '@material-ui/core/Badge';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import { NotificationsContext } from '../redux/NotificationsContext';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  })
)(Badge);

export default function AlertIcon(): JSX.Element {
  const { state } = useContext(NotificationsContext);

  return (
    <StyledBadge color="secondary" badgeContent={state.notifications.length}>
      <NotificationsNone />
    </StyledBadge>
  );
}
