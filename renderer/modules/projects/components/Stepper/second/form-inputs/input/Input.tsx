import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import inputElementStyle from './input.style';
import { ChangeEvent } from 'react';

interface InputParams {
  invalid: boolean;
  touched: boolean;
  value: string;
  elementConfig: {
    label: string;
    id: string;
  };
  disabled?: boolean;
  changed?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputProps: { id: string };
}

const Input = (props: InputParams): JSX.Element => {
  const inputClasses = [''];
  const classes = inputElementStyle({});

  if (props.invalid && props.touched) {
    inputClasses.push(classes.invalid);
  }

  return (
    <FormControl>
      <TextField
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        type="search"
        variant="outlined"
        onChange={props.changed}
        disabled={props.disabled}
        inputProps={props.inputProps}
      />
    </FormControl>
  );
};

export default Input;
