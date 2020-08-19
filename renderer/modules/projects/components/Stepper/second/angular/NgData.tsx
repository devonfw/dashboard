import { useContext, useState, ChangeEvent, useEffect } from 'react';
import Link from 'next/link';
import { StepperContext } from '../../../../redux/stepper/stepperContext';
import {
  INgData,
  EventType,
  FormParams,
} from '../../../../redux/stepper/data.model';
import NgDataRouting from './ng-data/NgDataRouting';
import NgDataStyling from './ng-data/NgDataStyling';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControl, Button } from '@material-ui/core';
import ngDataStyle from './ngData.style';
import { NextStepAction } from '../../../../redux/stepper/actions/step-action';
import { ProjectDataActionData } from '../../../../redux/stepper/actions/project-data-action';
import { WorkspaceService } from '../../../../services/workspace.service';

export default function NgData(): JSX.Element {
  const [workspaceDir, setWorkspaceDir] = useState<string[]>([]);
  const classes = ngDataStyle();
  const { state, dispatch } = useContext(StepperContext);
  const ERRORMSG = {
    projectAlreadyExists: 'Project already exits with this name',
    projectRequired: 'Please provide project name',
    pattern: 'Please remove special characters and numeric numbers',
  };
  const [data, setData] = useState<INgData>({
    name: {
      value: '',
      valid: false,
      error: '',
      touched: false,
    },
    routing: {
      value: 'true',
    },
    styling: {
      value: 'scss',
    },
    devonInstances: {
      value: '',
    },
  });

  useEffect(() => {
    const workspaceService = new WorkspaceService(setWorkspaceDir);
    workspaceService.getProjectsInWorkspace(state.projectData.path);
    return () => {
      workspaceService.closeListener();
    };
  }, []);

  const handleNg = () => {
    const ngData: INgData = data;
    if (data.name.valid) {
      dispatch(
        new ProjectDataActionData({
          name: ngData.name.value,
          specificArgs: {
            '--routing': ngData.routing.value,
            '--style': ngData.styling.value,
            '--interactive': false,
            '--skip-install': null,
          },
        })
      );

      dispatch(new NextStepAction());
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateExistingProject({
      event: event,
    });
  };

  const validateExistingProject = (event: EventType) => {
    const targetValue =
      event.event && event.event.target
        ? event.event.target.value
        : data.name.value;
    if (
      workspaceDir.filter(
        (project) => project.toLowerCase() === targetValue.toLowerCase()
      ).length
    ) {
      validateProjectName({
        value: targetValue,
        error: ERRORMSG.projectAlreadyExists,
        valid: false,
      });
    } else if (targetValue.match(/^[a-z]*$/gi) == null) {
      validateProjectName({
        value: targetValue,
        error: ERRORMSG.pattern,
        valid: false,
      });
    } else {
      validateProjectName({
        value: targetValue,
        error: '',
        valid: true,
      });
    }

    if (!targetValue) {
      validateProjectName({
        value: targetValue,
        error: ERRORMSG.projectRequired,
        valid: false,
      });
    }
  };

  const validateProjectName = (formData: FormParams) => {
    const updatedData = data;
    updatedData.name.value = formData.value;
    updatedData.name.error = formData.error;
    updatedData.name.valid = formData.valid;
    updatedData.name.touched = true;
    setData((prevState: INgData) => {
      return {
        ...prevState,
        updatedData,
      };
    });
  };

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
      type: 'RESET_STEP',
    });
  };

  const handleblur = () => {
    validateExistingProject({});
  };

  const step = (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            className={
              data.name.error && data.name.touched ? classes.invalid : ''
            }
          >
            <FormControl>
              <TextField
                id="component-simple"
                value={data.name.value}
                label="Project name *"
                type="search"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleblur}
              />
            </FormControl>
            {data.name.error && data.name.touched ? (
              <div className={classes.error}>{data.name.error}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <NgDataRouting onSelected={handleRouterSelection}></NgDataRouting>
          </Grid>
          <Grid item xs={12}>
            <NgDataStyling onSelected={handleStyleSelection}></NgDataStyling>
          </Grid>
        </Grid>
      </form>
      <div className={classes.action}>
        <Link href="/start">
          <div>
            <Button variant="outlined" onClick={setActiveState}>
              Back
            </Button>
          </div>
        </Link>
        <Button
          disabled={!data.name.valid}
          size="small"
          variant="contained"
          color="primary"
          onClick={handleNg}
        >
          Next
        </Button>
      </div>
    </div>
  );
  return step;
}
