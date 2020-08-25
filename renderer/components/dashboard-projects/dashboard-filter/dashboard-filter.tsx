import React, { useState, ChangeEvent, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

interface DashboardFilterProps {
  value: string;
  filterHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const DashboardFilter = (props: DashboardFilterProps): JSX.Element => {
  const [filterValue, setFilterValue] = useState<string>('');
  const onChangeFilterHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    props.filterHandler(event);
  };
  useEffect(() => {
    setFilterValue(props.value);
  }, [props.value]);
  return (
    <FormControl variant="outlined">
      <TextField
        select
        value={filterValue}
        variant="outlined"
        onChange={onChangeFilterHandler}
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
        <MenuItem value={'node'}>Node</MenuItem>
        <MenuItem value={'angular'}>Angular</MenuItem>
        <MenuItem value={'java'}>Java</MenuItem>
      </TextField>
    </FormControl>
  );
};
