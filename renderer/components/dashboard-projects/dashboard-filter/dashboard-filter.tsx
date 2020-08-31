import React, { ChangeEvent, MutableRefObject } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { stackKeys } from '../../../modules/projects/components/Stepper/first/stacks';

interface DashboardFilterProps {
  value: string;
  filterRef: MutableRefObject<HTMLInputElement>;
  filterHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const DashboardFilter = (props: DashboardFilterProps): JSX.Element => {
  const onChangeFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.filterHandler(event);
  };
  return (
    <FormControl variant="outlined">
      <TextField
        select
        value={props.value}
        variant="outlined"
        inputRef={props.filterRef}
        onChange={onChangeFilterHandler}
        label="Filter"
        inputProps={{
          id: 'filter',
        }}
      >
        <MenuItem value={'date'}>By Date Created</MenuItem>
        <MenuItem value={'name'}>By Name</MenuItem>
        <MenuItem
          value={''}
          disabled
          style={{
            color: 'rgb(73, 80, 87)',
            opacity: '1',
          }}
        >
          By Technology
        </MenuItem>
        {stackKeys.map((technology) => (
          <MenuItem key={technology} value={technology}>
            <div style={{ textTransform: 'capitalize' }}>{technology}</div>
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};
