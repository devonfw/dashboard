import React, { useState, useEffect } from 'react';
import MessageSenderService from '../../services/renderer/messageSender.service';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

export interface WorkspaceViewProps {}

export interface WorkspaceViewState {
  workspace: string;
  projects: string[];
}

export default function WorkspaceView(props: WorkspaceViewProps) {
  const messageSender: MessageSenderService = new MessageSenderService();
  const [data, setData] = useState<WorkspaceViewState>({
    workspace: '',
    projects: [],
  });

  useEffect(() => {
    console.log(data.workspace);
    messageSender.sendLs(data.workspace).then((projects) => {
      setData((prevState: WorkspaceViewState) => {
        console.log(projects);
        return { ...prevState, projects };
      });
    });
  }, [data.workspace]);

  const handleSendOpenDialog = async () => {
    const message = await messageSender.sendOpenDialog();
    if (!message['canceled']) {
      setData((prevState: WorkspaceViewState) => {
        return { ...prevState, workspace: message['filePaths'][0] };
      });
    }
  };

  return (
    <>
      <form>
        <FormControl>
          <InputLabel htmlFor="input-workspace">Workspace</InputLabel>
          <Input
            id="input-workspace"
            value={data.workspace}
            onClick={handleSendOpenDialog}
          />
        </FormControl>
      </form>
        {/*<ul>
          {data.projects.map((project: string) => (
            <li>{project}</li>
          ))}
        </ul>*/}
    </>
  );
}
