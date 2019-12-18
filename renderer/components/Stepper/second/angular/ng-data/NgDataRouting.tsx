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
  onSelected: (option: boolean) => void;
}

const NgDataRouting = (props: Props) => {
  const classes = useStyles();
  const [routing, setRouting] = useState('Yes');

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const routingOpt = event.target.value as string;
    setRouting(routingOpt);
    props.onSelected(routingOpt == 'Yes');
  };

  const step = (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-routing-label">Routing?</InputLabel>
        <Select
          labelId="select-routing-label"
          id="select-routing"
          value={routing}
          onChange={handleChange}
        >
          <MenuItem value={'Yes'}>Yes</MenuItem>
          <MenuItem value={'No'}>No</MenuItem>
        </Select>
      </FormControl>
    </>
  );
  return step;
};

export default NgDataRouting;
