import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useToolbarStyles } from './TableToolbar.styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageSenderService from '../../../services/renderer/messageSender.service';
import { createData, Data } from '../models/custom-table.model';
import { FormControl, InputLabel, Input } from '@material-ui/core';

interface EnhancedTableToolbarProps {
  numSelected: number;
  loadData: (data: Data[]) => void;
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const classes = useToolbarStyles();
  const messageSender: MessageSenderService = new MessageSenderService();
  const { numSelected, loadData } = props;
  const [workspace, setWorkspace] = useState<string>('');

  const sendLoadProjects = (dirPath: string) => {
    messageSender
      .sendLs(dirPath)
      .then((projects: string[]) =>
        loadData(projects.map((name: string) => createData(name))),
      );
  };

  const handleSendOpenDialog = async () => {
    const message = await messageSender.sendOpenDialog();
    if (!message['canceled']) {
      const dirPath = message['filePaths'][0];
      setWorkspace(dirPath);
      sendLoadProjects(dirPath);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          <form>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="input-workspace">Workspace</InputLabel>
              <Input
                id="input-workspace"
                value={workspace}
                onClick={handleSendOpenDialog}
              />
            </FormControl>
          </form>
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
