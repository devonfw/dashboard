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
  onSelected: (option: boolean) => void;
}

const NgDataRouting = (props: Props) => {
  const classes = useStyles();
  const [routing, setRouting] = useState('Yes');

  const handleChange = (event: ChangeEvent<{ value: any }>) => {
    const routingOpt = event.target.value as string;
    setRouting(routingOpt);
    props.onSelected(routingOpt == 'Yes');
  };

  const step = (
    <>
      <FormControl className={classes.formControl}>
      <TextField
          id="select-routing-label"
          select
          label="Routing?"
          value={routing}
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
