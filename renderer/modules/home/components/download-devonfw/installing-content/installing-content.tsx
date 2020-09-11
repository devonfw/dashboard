import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

interface InstallingContentProps {
  onClose: () => void;
}

export default function InstallingContent(
  props: InstallingContentProps
): JSX.Element {
  return (
    <>
      <DialogContent dividers>
        <LinearProgress />
        <Typography>Installing setup...</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={props.onClose}
          variant="outlined"
          color="secondary"
        >
          CLOSE
        </Button>
      </DialogActions>
    </>
  );
}
