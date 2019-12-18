import { useState, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface Props {
  onSelected: (option: string) => void;
}

const NgDataStyling = (props: Props) => {
  const classes = useStyles();
  const [styling, setStyling] = useState('SCSS');

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const stylingOpt = event.target.value as string;
    setStyling(stylingOpt);
    props.onSelected(stylingOpt);
  };

  const step = (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-styling-label">Styling?</InputLabel>
        <Select
          labelId="select-styling-label"
          id="select-styling"
          value={styling}
          onChange={handleChange}
        >
          <MenuItem value={'CSS'}>CSS</MenuItem>
          <MenuItem value={'SCSS'}>SCSS</MenuItem>
        </Select>
      </FormControl>
    </>
  );
  return step;
};

export default NgDataStyling;