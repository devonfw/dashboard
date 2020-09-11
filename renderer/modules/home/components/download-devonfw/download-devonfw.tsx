import { useState } from 'react';
import { DialogTitle } from '../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DownloadContent from './download-content/download-content';
import useDownloadButtonStyles from './download-devonfw.styles';

export default function DownloadDevonfw(): JSX.Element {
  const classes = useDownloadButtonStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        DOWNLOAD LATEST VERSION
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="download-dialog-title"
        open={open}
        classes={{ root: classes.root }}
      >
        <DialogTitle id="download-dialog-title">Installing devonfw</DialogTitle>
        <DownloadContent onClose={handleClose}></DownloadContent>
      </Dialog>
    </>
  );
}
