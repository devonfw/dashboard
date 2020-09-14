import { useState } from 'react';
import { DialogTitle } from '../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DownloadContent from './download-content/download-content';
import useDownloadDevonfwStyles from './download-devonfw.styles';
import { InstallFormProvider } from '../../redux/install-form';

const DASHBOARD_DOWNLOAD_URL =
  'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';

export default function DownloadDevonfw(): JSX.Element {
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
        href={DASHBOARD_DOWNLOAD_URL}
      >
        DOWNLOAD LATEST VERSION
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
