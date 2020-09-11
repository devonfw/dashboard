import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { useState } from 'react';
import InstallingContent from '../installing-content/installing-content';

interface GitFormContentProps {
  onClose: () => void;
}

export default function GitFormContent(
  props: GitFormContentProps
): JSX.Element {
  const [next, setNext] = useState(false);

  const handleNext = () => {
    setNext(true);
  };

  return (
    <>
      {next ? (
        <InstallingContent onClose={props.onClose} />
      ) : (
        <>
          <DialogContent dividers>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </FormControl>
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
