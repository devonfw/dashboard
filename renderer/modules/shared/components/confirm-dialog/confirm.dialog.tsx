import { DialogTitle, DialogContent, DialogActions } from '../dialog';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

interface ConfirmDialogProps {
  title: string;
  content: string;
  openDialog: boolean;
  onClose: (value: boolean) => void;
}

export default function ConfirmDialog(props: ConfirmDialogProps): JSX.Element {
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={props.openDialog}
    >
      <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
      <DialogContent dividers>
        <p>{props.content}</p>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => props.onClose(false)}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          autoFocus
          onClick={() => props.onClose(true)}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
