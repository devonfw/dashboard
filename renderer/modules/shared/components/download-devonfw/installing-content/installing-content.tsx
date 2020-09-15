import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import { useState, useEffect, useContext } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import InstallMessages from './install-messages/install-messages';
import {
  InstallFormContext,
  InstallFormState,
} from '../../../redux/install-form';
import InstallationService, {
  InstallationStatus,
} from '../../../services/installation/installation.service';

const MAX_MESSAGES_STORED = 40;

interface InstallingContentProps {
  onClose: () => void;
}

export default function InstallingContent(
  props: InstallingContentProps
): JSX.Element {
  const installationService = new InstallationService();
  const { state } = useContext(InstallFormContext);
  const [messages, setMessages] = useState<string[]>([]);
  const [installation, setInstallation] = useState({
    installing: false,
    error: false,
    finished: false,
  });

  useEffect(() => {
    setInstallation((prev) => ({ ...prev, installing: true }));
    return install(state);
  }, []);

  const install = (state: InstallFormState) => {
    return installationService.install(installHandler, state);
  };

  const installHandler = (status: InstallationStatus) => {
    setMessages((prev) => {
      const messages = [...prev];
      if (status) {
        messages.push(status.message);
      }

      if (messages.length > MAX_MESSAGES_STORED) {
        messages.shift();
      }

      return messages;
    });

    if (status.finished) {
      setInstallation({
        error: status.error,
        installing: false,
        finished: true,
      });
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Box pb={2}>
          <Box pt={2} pb={1}>
            {installation.finished ? (
              <LinearProgress variant="determinate" value={100} />
            ) : (
              <LinearProgress />
            )}
          </Box>
          <Typography>
            {installation.finished
              ? installation.error
                ? 'Installation failed'
                : 'Installation finished!'
              : 'Installing setup...'}
          </Typography>
        </Box>
        <InstallMessages messages={messages} />
      </DialogContent>
      <DialogActions>
        {installation.error ? (
          <Button
            autoFocus
            onClick={() => install(state)}
            variant="outlined"
            color="secondary"
          >
            RETRY
          </Button>
        ) : null}
        {installation.installing ? (
          <>
            <Button
              autoFocus
              onClick={() => installationService.cancel()}
              variant="outlined"
              color="secondary"
            >
              CANCEL
            </Button>
          </>
        ) : (
          <Button
            autoFocus
            onClick={props.onClose}
            variant="outlined"
            color="secondary"
          >
            CLOSE
          </Button>
        )}
      </DialogActions>
    </>
  );
}
