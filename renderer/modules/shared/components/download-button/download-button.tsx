import { useEffect, useState } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Spinner from '../spinner/spinner';

export default function DownloadButton(props: ButtonProps): JSX.Element {
  const [downloadProgress, setDownloadProgress] = useState(false);

  useEffect(() => {
    global.ipcRenderer.on('download completed', () => {
      if (downloadProgress) {
        setDownloadProgress(false);
      }
    });
  });
  return (
    <>
      {downloadProgress ? null : (
        <Button
          variant="contained"
          color="primary"
          disabled={props.disabled}
          className={props.className}
          href={props.href}
          size={props.size}
          onClick={() => setDownloadProgress(true)}
          startIcon={props.startIcon}
          disableElevation
        >
          {props.children}
        </Button>
      )}
      <Spinner size="30px" inProgress={downloadProgress}></Spinner>
    </>
  );
}
