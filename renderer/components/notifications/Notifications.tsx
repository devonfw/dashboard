import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NotificationsContext } from './redux/NotificationsContext';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'absolute',
      top: 0,
      right: 0,
    },
    paper: {
      width: '80%',
      maxHeight: 435,
    },

    notification: {
      backgroundColor: '#0075B3',
      width: 350,
      position: 'absolute',
      top: 50,
      right: 60,
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

export interface NotificationsDialogProps {
  open: boolean;
}

export default function NotificationsDialog(
  props: NotificationsDialogProps
): JSX.Element {
  const classes = useStyles();
  const { state } = useContext(NotificationsContext);
  const notifications: string[] = state.notifications || [];

  return (
    <>
      {props.open ? (
        <List component="div" role="list" className={classes.notification}>
          {notifications
            ? notifications.map((notification: string, index: number) => {
                return (
                  <ListItem divider role="listitem" key={index}>
                    <ListItemText
                      primary={notification}
                      secondary="something"
                    />
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  </ListItem>
                );
              })
            : null}
        </List>
      ) : null}
    </>
  );
}
