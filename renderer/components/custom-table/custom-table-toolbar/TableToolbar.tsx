import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import clsx from 'clsx';
import { useToolbarStyles } from './TableToolbar.styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MessageSenderService from '../../../services/renderer/messageSender.service';
import { createData, Data } from '../models/custom-table.model';
import { NotificationsContext } from '../../notifications/redux/NotificationsContext';
import { FormControl, InputLabel, Input } from '@material-ui/core';

const SOURCE_LOCATION: { [key: string]: string } = {
  local: 'path',
  git: 'url',
};

interface EnhancedTableToolbarProps {
  selected: string[];
  loadData: (data: Data[]) => void;
}

export default function EnhancedTableToolbar(
  props: EnhancedTableToolbarProps
): JSX.Element {
  const classes = useToolbarStyles();
  const messageSender: MessageSenderService = new MessageSenderService();
  const { dispatch } = useContext(NotificationsContext);
  const { selected, loadData } = props;
  const [workspace, setWorkspace] = useState<string>('');
  const [source, setSource] = useState('local');
  const [sourceLocation, setSourceLocation] = useState<string>('');
  const numSelected = selected.length;

  const copyFinishedMessage = () => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { notification: 'Finished copying' },
    });
    console.log('copy finished');
  };

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const sourceOpt = event.target.value as string;
    setSource(sourceOpt);
  };

  const sendLoadProjects = (dirPath: string) => {
    messageSender
      .sendLs(dirPath)
      .then((projects: string[]) =>
        loadData(projects.map((name: string) => createData(name)))
      );
  };

  const handleOpenSource = async () => {
    const message = await messageSender.sendOpenDialog();
    if (!message['canceled']) {
      const dirPath = message['filePaths'][0];
      setSourceLocation(dirPath);
      sendLoadProjects(dirPath);
    }
  };

  const handleOpenWorkspace = async () => {
    const message = await messageSender.sendOpenDialog();
    if (!message['canceled']) {
      const dirPath = message['filePaths'][0];
      setWorkspace(dirPath);
    }
  };

  const handleAddToWorkspace = () => {
    if (workspace && sourceLocation) {
      messageSender.sendCopy(sourceLocation, selected, workspace).then(() => {
        copyFinishedMessage();
      });
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
            <div className={classes.sourceContainer}>
              <FormControl className={classes.input}>
                <InputLabel htmlFor="input-workspace">
                  Projects {SOURCE_LOCATION[source]}
                </InputLabel>
                <Input
                  id="input-workspace"
                  value={sourceLocation}
                  onClick={handleOpenSource}
                />
              </FormControl>
              <FormControl className={classes.formControlSelect}>
                <InputLabel id="select-source-label">Source</InputLabel>
                <Select
                  labelId="select-routing-label"
                  id="select-routing"
                  value={source}
                  onChange={handleChange}
                >
                  <MenuItem value={'local'}>Local</MenuItem>
                  <MenuItem value={'git'}>Github</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl className={classes.input}>
              <InputLabel htmlFor="input-destination">
                Destination workspace
              </InputLabel>
              <Input
                id="input-destination"
                value={workspace}
                onClick={handleOpenWorkspace}
              />
            </FormControl>
          </form>
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Add to workspace">
          <IconButton
            aria-label="Add to workspace"
            onClick={handleAddToWorkspace}
          >
            <LibraryAddIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
