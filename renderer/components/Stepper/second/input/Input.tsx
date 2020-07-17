import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import inputElementStyle from './input.style';

const Input = (props: any) => {
  let inputElement = null;
  const inputClasses = [''];
  const classes = inputElementStyle({});

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.invalid);
  }

  switch (props.elementType) {
    case 'search':
      inputElement = (
        <TextField
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          type="search"
          variant="outlined"
          onChange={props.changed}
          disabled={props.disabled}
        />
      );
      break;
    case 'select':
      inputElement = (
        <TextField
          select
          {...props.elementConfig}
          value={props.value}
          variant="outlined"
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.displayValue}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    default:
      inputElement = (
        <TextField
          {...props.elementConfig}
          value={props.value}
          type="search"
          variant="outlined"
          onChange={props.changed}
        />
      );
  }

  return <FormControl>{inputElement}</FormControl>;
};

export default Input;
