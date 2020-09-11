import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import GitFormContent from '../git-form-content/git-form-content';
import { LICENSE } from './license';
import useLicenseContentStyles from './license-content.styles';

interface LicenseContentProps {
  onClose: () => void;
}

export default function LicenseContent(
  props: LicenseContentProps
): JSX.Element {
  const classes = useLicenseContentStyles();
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
            <LinearProgress />
            <Typography>Accept pending...</Typography>
            <Typography component="pre" className={classes.license}>
              {LICENSE}
            </Typography>
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
