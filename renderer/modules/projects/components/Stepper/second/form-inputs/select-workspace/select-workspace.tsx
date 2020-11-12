import { useState, ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

interface SelectWorkspaceProps {
  workspaces: string[];
  onSelected: (option: string) => void;
}

const SelectWorkspace = (props: SelectWorkspaceProps): JSX.Element => {
  const [workspace, setWorkspace] = useState({ value: 'main' });

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const selectedWorkspace = event.target.value;
    setWorkspace({ value: selectedWorkspace });
    props.onSelected(selectedWorkspace);
  };

  return (
    <>
      <FormControl>
        <TextField
          select
          label="Workspace"
          id="select-workspace"
          value={workspace.value}
          onChange={handleChange}
          variant="outlined"
        >
          {props.workspaces.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </>
  );
};

export default SelectWorkspace;
