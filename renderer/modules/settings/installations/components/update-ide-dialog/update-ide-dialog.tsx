import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import InstallMessages from '../../../../shared/components/download-devonfw/installing-content/install-messages/install-messages';
import { Box, LinearProgress, Typography } from '@material-ui/core';

interface UpdateIdeDialogProps {
  title: string;
  path: string;
  openDialog: boolean;
  onClose: () => void;
}

interface UpdateStatus {
  finished: boolean;
  error: boolean;
  message: string;
}

export default function UpdateIdeDialog(
  props: UpdateIdeDialogProps
): JSX.Element {
  const initialState: UpdateStatus = {
    finished: false,
    error: false,
    message: '',
  };
  const [messages, setMessages] = useState<string[]>([]);
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>(initialState);

  useEffect(() => {
    global.ipcRenderer.once(
      'update-ide',
      (_: IpcRendererEvent, status: UpdateStatus) => {
        setMessages((prev) => {
          const messages = [...prev];
          if (status) {
            messages.push(status.message);
          }

          return messages;
        });

        setUpdateStatus(status);
      }
    );

    return () => {
      removeUpdateListener();
    };
  });

  const removeUpdateListener = () => {
    global.ipcRenderer.removeAllListeners('update-ide');
  };

  const handleCancelUpdate = () => {
    global.ipcRenderer.send('update-ide:cancel');
    removeUpdateListener();
    setUpdateStatus({ finished: true, error: true, message: '' });
  };

  const closeDialog = () => {
    setMessages([]);
    setUpdateStatus(initialState);
    props.onClose();
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      fullWidth={true}
      open={props.openDialog}
    >
      <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
      <DialogContent dividers>
        <Box pb={2}>
          <Box pt={2} pb={1}>
            {updateStatus.finished ? (
              <LinearProgress variant="determinate" value={100} />
            ) : (
              <LinearProgress />
            )}
          </Box>
          <Typography>
            {updateStatus.finished
              ? updateStatus.error
                ? 'Update failed'
                : 'Update finished!'
              : 'Updating. This may take a while...'}
          </Typography>
        </Box>
        <InstallMessages messages={messages} />
      </DialogContent>
      <DialogActions>
        {updateStatus.finished ? (
          <Button
            color="secondary"
            variant="outlined"
            autoFocus
            onClick={closeDialog}
          >
            Close
          </Button>
        ) : (
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleCancelUpdate}
          >
            Cancel
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
