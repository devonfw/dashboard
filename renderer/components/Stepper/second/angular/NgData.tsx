import { useContext, MouseEvent, useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
import { IpcRendererEvent } from 'electron';
import { StepperContext } from '../../redux/stepperContext';
import { INgData, EventType, FormParams } from '../../redux/data.model';
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
import ngDataStyle from './ngData.style';

const NgData = () => {
  const messageSender: MessageSenderService = new MessageSenderService();
  const [workspaceDir, setWorkspaceDir] = useState<string[]>([]);
  const classes = ngDataStyle();
  const { dispatch } = useContext(StepperContext);
  const ERRORMSG = {
    projectAlreadyExists: 'Project already exits with this name',
    projectRequired: 'Please provide project name'
  }
  const [data, setData] = useState<INgData>({
    name: {
      value: '',
      valid: false,
      error: '',
      touched: false
    },
    routing: {
      value: 'true',
    },
    styling: {
      value: 'scss'
    },
    devonInstances: {
      value: ''
    }
  });

  const handleDevonInstancesSelection = (option: string) => {
    setData((prevState: INgData) => {
      return {
        ...prevState,
        devonInstances: { value: option }
      };
    });
  };

  const setDevonWorkspace = (dir: string[]) => {
    setWorkspaceDir(dir);
    resetForm();
  }

  const handleNg = (_: MouseEvent) => {
    const ngData: INgData = data;
    if (data.name.valid) {
      dispatch({
        type: 'SET_STACK_CMD',
        payload: {
          stackCmd: `devon ng new ${ngData.name.value} --routing=${ngData.routing.value} --style=${ngData.styling.value} --interactive=false`,
        },
      });

      dispatch({
        type: 'SET_STACK_CWD',
        payload: {
          stackCwd: `${ngData.devonInstances.value}`,
        },
      });

      dispatch({
        type: 'NEXT_STEP',
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateExistingProject({
      event: event
    });
  };

  const validateExistingProject = (event: EventType) => {
    let targetValue = event.event && event.event.target ? event.event.target.value : data.name.value;
    let workspace = event.dir ? event.dir : workspaceDir;
    if (workspace.includes(targetValue)) {
      validateProjectName({
        value: targetValue,
        error: ERRORMSG.projectAlreadyExists,
        valid: false
      });
    } else {
      validateProjectName({
        value: targetValue,
        error: '',
        valid: true
      });
    }

    if (!targetValue) {
      validateProjectName({
        value: targetValue,
        error: ERRORMSG.projectRequired,
        valid: false
      });
    }
  }

  const validateProjectName = (formData: FormParams) => {
    const updatedData = data;
    updatedData.name.value = formData.value;
    updatedData.name.error = formData.error;
    updatedData.name.valid = formData.valid;
    updatedData.name.touched = true;
    setData((prevState: INgData) => {
      return {
        ...prevState,
        updatedData
      };
    });
  }

  const handleRouterSelection = (option: string) => {
    setData((prevState: INgData) => {
      return { ...prevState, routing: { value: option } };
    });
  };

  const handleStyleSelection = (option: string) => {
    setData((prevState: INgData) => {
      return { ...prevState, styling: { value: option } };
    });
  };

  const setActiveState = () => {
    dispatch({
      type: 'RESET_STEP'
    });
  }

  const resetForm = () => {
    setData((prevState: INgData) => {
      return {
        ...prevState,
        name: {
          value: '',
          valid: false,
          error: '',
          touched: false
        }
      };
    });
  }

  const handleblur = () => {
    validateExistingProject({});
  }

  const step = (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={`project ${data.name.error && data.name.touched ? classes.invalid : ''}`}>
          <FormControl>
            <TextField
              id="component-simple"
              value={data.name.value}
              label="Project name *"
              type="search"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleblur} />
          </FormControl>
          {data.name.error && data.name.touched ? <div className={classes.error}>{data.name.error}</div> : null}
        </div>
        <div className="formControl">
          <NgDataRouting onSelected={handleRouterSelection}></NgDataRouting>
        </div>
        <div className="formControl">
          <NgDataStyling onSelected={handleStyleSelection}></NgDataStyling>
        </div>
        <div className="formControl">
          <NgDataDevonInstances
            onSelected={handleDevonInstancesSelection}
            devonWorkspace={setDevonWorkspace}
          ></NgDataDevonInstances>
        </div>
      </form>
      <div className={classes.action}>
        <Link href="/start">
          <div>
            <Button variant="outlined" onClick={setActiveState}>Back</Button>
          </div>
        </Link>
        <Button
          disabled={!data.name.valid}
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
