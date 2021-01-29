import { join } from 'path';
import { useContext, useState, ChangeEvent, useEffect, useRef } from 'react';
import Link from 'next/link';
import { StepperContext } from '../../../../redux/stepper/stepperContext';
import {
  INgData,
  EventType,
  FormParams,
} from '../../../../redux/stepper/data.model';
import NgDataRouting from './ng-data/NgDataRouting';
import NgDataStyling from './ng-data/NgDataStyling';
import SelectWorkspace from '../form-inputs/select-workspace/select-workspace';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { FormControl, Button } from '@material-ui/core';
import ngDataStyle from './ngData.style';
import { NextStepAction } from '../../../../redux/stepper/actions/step-action';
import { ProjectDataActionData } from '../../../../redux/stepper/actions/project-data-action';
import { WorkspaceService } from '../../../../services/workspace.service';

export default function NgData(): JSX.Element {
  const [workspaceDir, setWorkspaceDir] = useState<string[]>([]);
  const [projectsDir, setProjectsDir] = useState<string[]>([]);
  let projectsDirOldVal: string[] = [];
  const classes = ngDataStyle();
  const { state, dispatch } = useContext(StepperContext);
  const ERRORMSG = {
    projectAlreadyExists: 'Project already exits with this name',
    projectRequired: 'Please provide project name',
    pattern:
      'Please enter valid project name (eg: app or app-demo or app-demo123)',
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
    workspace: {
      value: 'main',
    },
  });

  useEffect(() => {
    global.ipcRenderer
      .invoke('get:dirsFromPath', join(state.projectData.path, 'workspaces'))
      .then((dirs: string[]) => setWorkspaceDir(dirs));
    getProjectsInWorkspace(
      join(state.projectData.path, 'workspaces', state.projectData.workspace)
    );
    if (projectsDir === projectsDirOldVal) {
      console.log('oldval');
    } else {
      console.log('newval');
      console.log('projectsDir old val: ', projectsDirOldVal);
      console.log('projectsDir before calling fn: ', projectsDir);
      validateExistingProject();
    }
    return () => {
      global.ipcRenderer.removeAllListeners('get:dirsFromPath');
    };
  }, []);

  const useStateCallback = (initialState: string[]) => {
    const [cbstate, setCbState] = useState(initialState);
    const initCb = (a: unknown) => {};
    const cbRef = useRef(initCb); // mutable ref to store current callback

    const setStateCallback = (cbstate: string[], cb: any) => {
      cbRef.current = cb; // store passed callback to ref
      setCbState(cbstate);
    };

    useEffect(() => {
      // cb.current is `null` on initial render, so we only execute cb on cbstate *updates*
      if (cbRef.current) {
        cbRef.current(cbstate);
        cbRef.current = initCb; // reset callback after execution
      }
    }, [cbstate]);

    return [cbstate, setStateCallback];
  };

  const getProjectsInWorkspace = (
    workspacePath: string,
    callback?: () => void
  ) => {
    global.ipcRenderer
      .invoke('get:dirsFromPath', workspacePath)
      .then((dirs: string[]) =>
        setProjectsDir((prevState: string[]) => {
          projectsDirOldVal = prevState;
          if (callback) callback();
          return dirs;
        })
      );
  };

  const handleNg = () => {
    const ngData: INgData = data;
    if (data.name.valid) {
      dispatch(
        new ProjectDataActionData({
          name: ngData.name.value,
          workspace: ngData.workspace.value,
          specificArgs: {
            '--routing': ngData.routing.value,
            '--style': ngData.styling.value,
            '--interactive': false,
            '--skip-install': null,
            '--skip-git': null,
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

  const validateExistingProject = (event?: EventType) => {
    const targetValue =
      event && event.event && event.event.target
        ? event.event.target.value
        : data.name.value;
    console.log('target value: ', targetValue);
    console.log('projectsDir in fn: ', projectsDir);
    if (
      projectsDir.filter(
        (project) => project.toLowerCase() === targetValue.toLowerCase()
      ).length
    ) {
      console.log('projectAlreadyExists');
      validateProjectName({
        value: targetValue,
        error: ERRORMSG.projectAlreadyExists,
        valid: false,
      });
    } else if (targetValue.match(/^[a-z](\-*[a-z]\d*)*$/gi) == null) {
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
    console.log('formdata: ', updatedData);
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

  const handleWorkspaceSelection = (option: string) => {
    setData((prevState: INgData) => {
      return { ...prevState, workspace: { value: option } };
    });
    getProjectsInWorkspace(join(state.projectData.path, 'workspaces', option));
    /* if (projectsDir === projectsDirOldVal) {
      console.log('oldval');
    } else {
      console.log('newval');
      console.log('projectsDir old val: ', projectsDirOldVal);
      console.log('projectsDir before calling fn: ', projectsDir);
      validateExistingProject();
    } */
  };

  const setActiveState = () => {
    dispatch({
      type: 'RESET_STEP',
    });
  };

  const handleblur = () => {
    validateExistingProject();
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
          <Grid item xs={12}>
            <SelectWorkspace
              workspaces={workspaceDir}
              onSelected={handleWorkspaceSelection}
            ></SelectWorkspace>
          </Grid>
        </Grid>
      </form>
      <div className={classes.action}>
        <Link href="/projects/creation">
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
