import { useState } from 'react';
import { DialogTitle } from '../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DownloadContent from './download-content/download-content';
import useDownloadDevonfwStyles from './download-devonfw.styles';
import { InstallFormProvider } from '../../redux/install-form';

interface DownloadDevonfwProps {
  url: string;
  children: JSX.Element | string;
}

export default function DownloadDevonfw(
  props: DownloadDevonfwProps
): JSX.Element {
  const classes = useDownloadDevonfwStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        href={props.url}
        disableElevation
      >
        {props.children}
      </Button>
      <InstallFormProvider>
        <Dialog
          aria-labelledby="download-dialog-title"
          open={open}
          classes={{ root: classes.root }}
        >
          <DialogTitle id="download-dialog-title">
            Installing devonfw
          </DialogTitle>
          <DownloadContent onClose={handleClose}></DownloadContent>
        </Dialog>
      </InstallFormProvider>
    </>
  );
}
