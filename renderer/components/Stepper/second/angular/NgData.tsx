import { useContext, MouseEvent, useState, ChangeEvent } from 'react';
import { StepperContext } from '../../../redux/stepper/stepperContext';
import { INgData } from '../../../redux/stepper/data.model';
import NgDataRouting from './ng-data/NgDataRouting';
import NgDataStyling from './ng-data/NgDataStyling';
import MessageSenderService from '../../../../services/messageSender.service';
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
      display: 'flex',
      'flex-direction': 'column',
    },
  }),
);

const NgData = () => {
  const messageSender: MessageSenderService = new MessageSenderService();

  const classes = useStyles();
  const { dispatch } = useContext(StepperContext);
  const [data, setData] = useState<INgData>({
    cwd: '',
    name: 'project-default',
    routing: true,
    styling: 'scss',
  });

  const handleNg = (_: MouseEvent) => {
    const ngData: INgData = data;

    dispatch({
      type: 'SET_STACK_CMD',
      payload: {
        stackCmd: `devon ng new ${ngData.name} --routing=${ngData.routing} --style=${ngData.styling} --interactive=false`,
      },
    });

    dispatch({
      type: 'SET_STACK_CWD',
      payload: {
        stackCwd: `${ngData.cwd}`,
      },
    });

    dispatch({
      type: 'NEXT_STEP',
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const targetVal = event.target.value;

    setData((prevState: INgData) => {
      return { ...prevState, name: targetVal };
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

  const handleSendOpenDialog = async () => {
    const message = await messageSender.sendOpenDialog();
    if (!message['canceled']) {
      setData((prevState: INgData) => {
        return { ...prevState, cwd: message['filePaths'] };
      });
    }
  };

  const step = (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl>
        <InputLabel htmlFor="input-cwd">Destination folder</InputLabel>
        <Input id="input-cwd" value={data.cwd} onClick={handleSendOpenDialog} />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="component-simple">Project name</InputLabel>
        <Input
          id="component-simple"
          value={data.name}
          onChange={handleChange}
        />
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
