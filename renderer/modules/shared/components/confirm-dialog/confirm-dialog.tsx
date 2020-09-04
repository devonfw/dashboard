import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import AcceptButton from '../accept-button/accept-button';

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
        <Button color="primary" onClick={() => props.onClose(false)}>
          Cancel
        </Button>
        <AcceptButton autoFocus onClick={() => props.onClose(true)}>
          Ok
        </AcceptButton>
      </DialogActions>
    </Dialog>
  );
}
