import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

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
      backgroundColor: '#424242',
      width: 350,
      position: 'absolute',
      top: 50,
      right: 60,
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export interface NotificationsDialogProps {
  open: boolean;
}

export default function NotificationsDialog(props: NotificationsDialogProps) {
  const classes = useStyles();

  return (
    <>
      {props.open ? (
        <List component="div" role="list" className={classes.notification}>
          <ListItem button divider disabled role="listitem">
            <ListItemText primary="Interruptions" />
          </ListItem>
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="phone ringtone"
            role="listitem"
          >
            <ListItemText primary="Phone ringtone" secondary={'value'} />
          </ListItem>
          <ListItem button divider disabled role="listitem">
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      ) : null}
    </>
  );
}
