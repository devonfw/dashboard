import React, { useState } from 'react';
import { useChangelogStyles } from './changelog.styles';
import {
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../../../../shared/components/dialog';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AsciidocViewer from '../asciidoct-viewer/asciidoc-viewer';
import ChangelogService from '../../services/changelog.service';
import ButtonLink from '../../../../shared/components/button-link/button-link';

interface ChangelogProps {
  version: string;
}

export default function Changelog(props: ChangelogProps): JSX.Element {
  const classes = useChangelogStyles();
  const changelogService = new ChangelogService();
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpenChangelog = (title: string) => {
    return async () => {
      const content = await changelogService.getChangelog(title);
      setContent(content);
      setOpen(true);
    };
  };

  const handleCloseChangelog = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonLink onClick={handleOpenChangelog(props.version)}></ButtonLink>
      <Dialog
        onClose={handleCloseChangelog}
        aria-labelledby="changelog-dialog-title"
        open={open}
      >
        <DialogTitle id="changelog-dialog-title">{props.version}</DialogTitle>
        <DialogContent dividers>
          <AsciidocViewer className={classes.link} content={content} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseChangelog}
            variant="outlined"
            color="secondary"
          >
            OKAY GOT IT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
