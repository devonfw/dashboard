import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import selectElementStyle from './select.style';
import { ChangeEvent } from 'react';
import { Database } from '../../../../../../../models/dashboard/Database';

interface SelectParams {
  value: string;
  elementConfig?: {
    label: string;
    id: string;
  };
  elementSelectOptions: Database[];
  changed: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Select = (props: SelectParams): JSX.Element => {
  const classes = selectElementStyle();
  return (
    <FormControl>
      <TextField
        select
        {...props.elementConfig}
        value={props.value}
        variant="outlined"
        onChange={props.changed}
      >
        {props.elementSelectOptions.map((option) => (
          <MenuItem key={option} value={option}>
            <div className={classes.capitalize}>{option}</div>
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};

export default Select;
