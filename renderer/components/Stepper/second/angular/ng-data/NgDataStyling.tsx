import { useState, ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

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

  const handleChange = (event: ChangeEvent<{ value: any }>) => {
    const stylingOpt = event.target.value as string;
    setStyling(stylingOpt);
    props.onSelected(stylingOpt);
  };

  const step = (
    <>
      <FormControl className={classes.formControl}>

        <TextField
          id="select-styling-label"
          select
          label="Styling?"
          value={styling}
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={'CSS'}>CSS</MenuItem>
          <MenuItem value={'SCSS'}>SCSS</MenuItem>
        </TextField>

      </FormControl>
    </>
  );
  return step;
};

export default NgDataStyling;