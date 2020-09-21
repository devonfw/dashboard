import React, { useState } from 'react';
import AcceptButton from '../../../../shared/components/accept-button/accept-button';
import ConfirmDialog from '../../../../shared/components/confirm-dialog/confirm.dialog';
import UpdateIdeDialog from '../update-ide-dialog/update-ide-dialog';

interface UpdateIdeProps {
  path: string;
}

export default function UpdateIde(props: UpdateIdeProps): JSX.Element {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const confirmDialogTitle = 'Updating IDE';
  const confirmDialogContent =
    'Devonfw Dashboard will update settings and software for this IDE. Proceed?';
  const handleCloseConfirmDialog = (confirm: boolean): void => {
    setOpenConfirmDialog(false);
    if (confirm) {
      global.ipcRenderer.send('update-ide', { path: props.path });
      setOpenUpdateDialog(true);
    }
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <>
      <AcceptButton
        disabled={!props.path}
        onClick={() => setOpenConfirmDialog(true)}
      >
        Update
      </AcceptButton>
      <UpdateIdeDialog
        title={confirmDialogTitle}
        path={props.path}
        openDialog={openUpdateDialog}
        onClose={handleCloseUpdateDialog}
      ></UpdateIdeDialog>
      <ConfirmDialog
        title={confirmDialogTitle}
        content={confirmDialogContent}
        openDialog={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      ></ConfirmDialog>
    </>
  );
}
