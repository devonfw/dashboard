import { useState, useEffect, useContext } from 'react';
import {
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import LicenseContent from '../license-content/license-content';
import { Box } from '@material-ui/core';
import { InstallFormContext } from '../../../redux/install-form';

interface DownloadContentProps {
  onClose: () => void;
}

interface SaveInfo {
  path: string;
  filename: string;
}

export default function DownloadContent(
  props: DownloadContentProps
): JSX.Element {
  const { dispatch } = useContext(InstallFormContext);
  const [next, setNext] = useState(false);
  const [downloading, setDownloading] = useState(true);

  useEffect(() => {
    global.ipcRenderer.on(
      'download completed',
      (_: unknown, saveInfo: SaveInfo) => {
        setDownloading(false);
        dispatch({ path: saveInfo.path, filename: saveInfo.filename });
      }
    );
  }, []);

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
              {downloading ? (
                <LinearProgress />
              ) : (
                <LinearProgress variant="determinate" value={100} />
              )}
            </Box>
            <Typography>
              {downloading ? 'Downloading...' : 'Download complete'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={handleNext}
              variant="outlined"
              color="secondary"
              disabled={downloading}
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
