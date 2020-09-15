import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import { useState, ChangeEvent, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import InstallingContent from '../installing-content/installing-content';
import WhiteTextField from '../../../../shared/components/white-text-field/white-text-field';
import { InstallFormContext } from '../../../redux/install-form';

interface GitFormContentProps {
  onClose: () => void;
}

export default function GitFormContent(
  props: GitFormContentProps
): JSX.Element {
  const { dispatch } = useContext(InstallFormContext);
  const [next, setNext] = useState(false);
  const [selection, setSelection] = useState('git');
  const [settingsUrl, setSettingsUrl] = useState('');

  const handleNext = (selection: string, settingsUrl: string) => {
    return () => {
      const url = selection === 'git' ? settingsUrl : '';
      dispatch({ settingsUrl: url });
      setNext(true);
    };
  };

  const handleSelectionChange = (change: ChangeEvent<HTMLInputElement>) => {
    setSelection(change.target.value);
  };

  const handleInputChange = (change: ChangeEvent<HTMLInputElement>) => {
    setSettingsUrl(change.target.value);
  };

  return (
    <>
      {next ? (
        <InstallingContent onClose={props.onClose} />
      ) : (
        <>
          <DialogContent dividers>
            <form>
              <FormControl component="fieldset" fullWidth>
                <Box>
                  <RadioGroup
                    name="configuration"
                    value={selection}
                    onChange={handleSelectionChange}
                    defaultValue="git"
                  >
                    <FormControlLabel
                      value="git"
                      control={
                        <Radio
                          icon={<RadioButtonUncheckedIcon color="primary" />}
                          checkedIcon={<CheckCircleIcon color="primary" />}
                        />
                      }
                      label="Select the Git url for the installation setup"
                    />
                    <Box ml={4} mb={2}>
                      <WhiteTextField
                        label="Configuration file URL"
                        placeholder="Git URL"
                        variant="outlined"
                        type="input"
                        fullWidth
                        value={settingsUrl}
                        onChange={handleInputChange}
                      />
                    </Box>

                    <FormControlLabel
                      value="empty"
                      control={
                        <Radio
                          icon={<RadioButtonUncheckedIcon color="primary" />}
                          checkedIcon={<CheckCircleIcon color="primary" />}
                        />
                      }
                      label="Skip this process"
                    />
                  </RadioGroup>
                </Box>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleNext(selection, settingsUrl)}
              variant="outlined"
              color="secondary"
              disabled={selection === 'git' && !settingsUrl}
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
