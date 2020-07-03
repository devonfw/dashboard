import { useContext, MouseEvent, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import { StepperContext } from '../../redux/stepperContext';
import { INgData } from '../../redux/data.model';
import NgDataRouting from './ng-data/NgDataRouting';
import NgDataStyling from './ng-data/NgDataStyling';
import NgDataDevonInstances from './ng-data/NgDataDevonInstances';
import MessageSenderService from '../../../../services/renderer/messageSender.service';
import TextField from '@material-ui/core/TextField';
import {
  FormControl,
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
      '& .MuiFormControl-root': {
        width: '40em'
      },
      '& .formControl': {
        marginTop: '1em'
      },
      '& .project': {
        paddingLeft: '8px'
      }
    },
    action: {
      marginTop: '1em',
      marginLeft: '24px',
      display: 'flex',
      '& button': {
        marginRight: '1em',
        width: '75px'
      },
      '& .MuiButton-containedSizeSmall': {
        padding: '7px 10px'
      }
    }
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
    devonInstances: ''
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
        stackCwd: `${ngData.devonInstances}`,
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

  const handleDevonInstancesSelection = (option: string) => {
    setData((prevState: INgData) => {
      return { ...prevState, devonInstances: option };
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

  const setActiveState = () => {
    dispatch({
      type: 'RESET_STEP'
    });
  }

  const step = (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className="project">
          <FormControl>
            <TextField id="component-simple" value={data.name} label="Project name" type="search" variant="outlined" onChange={handleChange} />
          </FormControl>
        </div>
        <div className="formControl">
          <NgDataRouting onSelected={handleRouterSelection}></NgDataRouting>
        </div>
        <div className="formControl">
          <NgDataStyling onSelected={handleStyleSelection}></NgDataStyling>
        </div>
        <div className="formControl">
          <NgDataDevonInstances onSelected={handleDevonInstancesSelection}></NgDataDevonInstances>
        </div>
      </form>
      <div className={classes.action}>
        <Link href="/start">
          <div>
            <Button variant="outlined" onClick={setActiveState}>Back</Button>
          </div>
        </Link>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleNg}>
          Next
        </Button>
      </div>
    </div>
  );
  return step;
};

export default NgData;
