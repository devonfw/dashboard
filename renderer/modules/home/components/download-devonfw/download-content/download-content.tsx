import { useState } from 'react';
import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import LicenseContent from '../license-content/license-content';
import { Box } from '@material-ui/core';

interface DownloadContentProps {
  onClose: () => void;
}

export default function DownloadContent(
  props: DownloadContentProps
): JSX.Element {
  const [next, setNext] = useState(false);

  const handleNext = () => {
    setNext(true);
  };

  return (
    <>
      {next ? (
        <LicenseContent onClose={props.onClose}></LicenseContent>
      ) : (
        <>
          <DialogContent dividers>
            <Box pt={2} pb={1}>
              <LinearProgress />
            </Box>
            <Typography>Downloading...</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleNext}
              variant="outlined"
              color="secondary"
            >
              NEXT
            </Button>
            <Button
              autoFocus
              onClick={props.onClose}
              variant="outlined"
              color="secondary"
            >
              CANCEL
            </Button>
          </DialogActions>
        </>
      )}
    </>
  );
}
