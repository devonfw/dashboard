import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import InstallMessages from './install-messages/install-messages';

interface InstallingContentProps {
  onClose: () => void;
}

export default function InstallingContent(
  props: InstallingContentProps
): JSX.Element {
  return (
    <>
      <DialogContent dividers>
        <Box pb={2}>
          <Box pt={2} pb={1}>
            <LinearProgress />
          </Box>
          <Typography>Installing setup...</Typography>
        </Box>
        <InstallMessages />
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
