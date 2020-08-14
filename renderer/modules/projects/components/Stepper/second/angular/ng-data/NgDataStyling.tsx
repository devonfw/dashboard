import { useState, ChangeEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

interface Props {
  onSelected: (option: string) => void;
}

const NgDataStyling = (props: Props): JSX.Element => {
  const [styling, setStyling] = useState({ value: 'scss' });

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const stylingOpt = event.target.value;
    setStyling({ value: stylingOpt });
    props.onSelected(stylingOpt);
  };

  const step = (
    <>
      <FormControl>
        <TextField
          id="select-styling-label"
          select
          label="Styling?"
          value={styling.value}
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={'css'}>CSS</MenuItem>
          <MenuItem value={'scss'}>SCSS</MenuItem>
        </TextField>
      </FormControl>
    </>
  );
  return step;
};

export default NgDataStyling;
