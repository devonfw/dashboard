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
  })
);

interface Props {
  onSelected: (option: string) => void;
}

const NgDataRouting = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [routing, setRouting] = useState({ value: 'Yes' });

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const routingOpt = event.target.value;
    setRouting({ value: routingOpt });
    props.onSelected(routingOpt);
  };

  const step = (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          id="select-routing-label"
          select
          label="Routing?"
          value={routing.value}
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={'Yes'}>Yes</MenuItem>
          <MenuItem value={'No'}>No</MenuItem>
        </TextField>
      </FormControl>
    </>
  );
  return step;
};

export default NgDataRouting;
