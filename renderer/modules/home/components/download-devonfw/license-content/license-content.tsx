import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import GitFormContent from '../git-form-content/git-form-content';
import License from './license/license';

interface LicenseContentProps {
  onClose: () => void;
}

export default function LicenseContent(
  props: LicenseContentProps
): JSX.Element {
  const [next, setNext] = useState(false);

  const handleNext = () => {
    setNext(true);
  };

  return (
    <>
      {next ? (
        <GitFormContent onClose={props.onClose} />
      ) : (
        <>
          <DialogContent dividers>
            <Box pb={2}>
              <Box pt={2} pb={1}>
                <LinearProgress />
              </Box>
              <Typography>Accept pending...</Typography>
            </Box>
            <License />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleNext}
              variant="outlined"
              color="secondary"
            >
              I ACCEPT
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
