import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IdeDialogTitle from './ide-dialog-title/ide-dialog-title';
import IdeList from './ide-list/ide-list';
import { IdeInstallations } from '../landing-page/landing-page';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../../../shared/components/dialog';

interface IdeDialogProps {
  data: IdeInstallations[];
  open: boolean;
  onClose: () => void;
}

export default function IdeDialog(props: IdeDialogProps): JSX.Element {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      aria-labelledby="changelog-dialog-title"
    >
      <DialogTitle id="available-ides-dialog">
        <IdeDialogTitle></IdeDialogTitle>
      </DialogTitle>
      <DialogContent dividers>
        <p>The following are the paths of installed devon instances:</p>
        <IdeList data={props.data}></IdeList>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClose}
          variant="outlined"
          style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}
        >
          Ok Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
}
