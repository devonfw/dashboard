import { join } from 'path';
import { Component, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { StepperContext } from '../../../../redux/stepper/stepperContext';
import { INodeInitializerForm } from '../../../../../../models/dashboard/INodeInitializer';
import nodeInitializerStyle from './nodeInitializerStyle';
import nodeProjectConfig from './nodeInitializerFormConfig';
import ValidateForm from '../validation/ValidateForm';
import { NextStepAction } from '../../../../redux/stepper/actions/step-action';
import { ErrorHandler } from '../validation/error-handler/error-handler';
import Input from '../form-inputs/input/Input';
import SelectWorkspace from '../form-inputs/select-workspace/select-workspace';

interface NodeInitializerProps {
  classes: {
    root: string;
    error: string;
    action: string;
  };
}

class NodeInitializer extends Component<NodeInitializerProps> {
  state: INodeInitializerForm = nodeProjectConfig;

  constructor(props: NodeInitializerProps) {
    super(props);
  }

  componentDidMount(): void {
    global.ipcRenderer
      .invoke(
        'get:dirsFromPath',
        join(this.context.state.projectData.path, 'workspaces')
      )
      .then((dirs: string[]) => this.setState({ workspaceDir: dirs }));
    this.getProjectsInWorkspace(
      join(
        this.context.state.projectData.path,
        'workspaces',
        this.state.workspace
      )
    );
  }

  componentWillUnMount(): void {
    global.ipcRenderer.removeAllListeners('get:dirsFromPath');
  }

  getProjectsInWorkspace = (workspacePath: string) => {
    global.ipcRenderer
      .invoke('get:dirsFromPath', workspacePath)
      .then((dirs: string[]) => this.setState({ projectsDir: dirs }));
  };

  createProjectHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: INodeInitializerForm = this.state;

    this.context.dispatch({
      type: 'SET_PROJECT_DATA',
      payload: {
        projectData: {
          name: formData.formControls.name.value.toLowerCase(),
          workspace: formData.workspace,
          specificArgs: {
            '-n': null,
            '--skip-install': null,
          },
        },
      },
    });

    this.context.dispatch(new NextStepAction());
  };

  eventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const formState = {
      ...this.state.formControls,
    };
    if (event.target.id === 'name') {
      const element = { ...formState.name };
      element.touched = true;
      element.value = event.target.value;
      if (element.validation) {
        ValidateForm.checkValidity(
          element,
          event.target.id,
          this.state.projectsDir
        );
      }
      formState.name = element;
    }

    this.setState({
      formControls: formState,
      formIsValid: ValidateForm.nodeFormStateValidity(formState),
    });
  };

  handleWorkspaceSelection = (option: string) => {
    this.setState({
      workspace: option,
    });
    this.getProjectsInWorkspace(
      join(this.context.state.projectData.path, 'workspaces', option)
    );
  };

  setActiveState = () => {
    this.context.dispatch({
      type: 'RESET_STEP',
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.createProjectHandler}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Input
              elementConfig={this.state.formControls.name.elementConfig}
              value={this.state.formControls.name.value}
              invalid={!this.state.formControls.name.valid}
              touched={this.state.formControls.name.touched}
              disabled={this.state.formControls.name.disabled}
              changed={this.eventHandler}
              inputProps={{
                id: this.state.formControls.name.elementConfig.id,
              }}
            />
            <ErrorHandler formControl={this.state.formControls.name} />
          </Grid>
          <Grid item xs={12}>
            <SelectWorkspace
              workspaces={this.state.workspaceDir}
              onSelected={this.handleWorkspaceSelection}
            ></SelectWorkspace>
          </Grid>
        </Grid>
        <div className={classes.action}>
          <Link href="/projects/creation">
            <div>
              <Button variant="outlined" onClick={this.setActiveState}>
                Back
              </Button>
            </div>
          </Link>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!this.state.formIsValid}
          >
            Next
          </Button>
        </div>
      </form>
    );
  }
}

NodeInitializer.contextType = StepperContext;

export default withStyles(nodeInitializerStyle)(NodeInitializer);
