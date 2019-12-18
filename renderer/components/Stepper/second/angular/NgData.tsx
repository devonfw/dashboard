import { useContext, MouseEvent, useState, ChangeEvent } from 'react';
import { StepperContext } from '../../../redux/stepperContext';
import { INgData } from '../../../redux/data.model';
import NgDataRouting from './ng-data/NgDataRouting';
import NgDataStyling from './ng-data/NgDataStyling';
import {
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginLeft: theme.spacing(2),
      },
      'display': 'flex',
      'flex-direction': 'column',
    },
  }),
);

const NgData = () => {
  const classes = useStyles();

  const { dispatch } = useContext(StepperContext);
  const [data, setData] = useState<INgData>({
    name: 'project-default',
    routing: true,
    styling: 'scss',
  });

  const handleNg = (_: MouseEvent) => {
    const ngData: INgData = data;

    dispatch({
      type: 'SET_STACK_DATA',
      payload: { stackData: ngData },
    });

    dispatch({
      type: 'NEXT_STEP',
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prevState: INgData) => {
      return { ...prevState, name: event.target.value };
    });
  };

  const handleRouterSelection = (option: boolean) => {
    setData((prevState: INgData) => {
      return { ...prevState, routing: option };
    });
  };

  const handleStyleSelection = (option: string) => {
    setData((prevState: INgData) => {
      return { ...prevState, styling: option };
    });
  };

  const step = (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="component-simple">Project name</InputLabel>
        <Input id="component-simple" value={name} onChange={handleChange} />
      </FormControl>
      <NgDataRouting onSelected={handleRouterSelection}></NgDataRouting>
      <NgDataStyling onSelected={handleStyleSelection}></NgDataStyling>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={handleNg}
      >
        Next
      </Button>
    </form>
  );
  return step;
};

export default NgData;
