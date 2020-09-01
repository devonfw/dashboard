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
import { WorkspaceService } from '../../../../services/workspace.service';
import { ErrorHandler } from '../validation/error-handler/error-handler';
import Input from '../form-inputs/input/Input';

interface NodeInitializerProps {
  classes: {
    root: string;
    error: string;
    action: string;
  };
}

class NodeInitializer extends Component<NodeInitializerProps> {
  state: INodeInitializerForm = nodeProjectConfig;
  workspaceService: WorkspaceService;

  constructor(props: NodeInitializerProps) {
    super(props);
    this.workspaceService = new WorkspaceService(
      this.setDevonfwWorkspaces.bind(this)
    );
  }

  componentDidMount(): void {
    this.workspaceService.getProjectsInWorkspace(
      this.context.state.projectData.path
    );
  }

  componentWillUnMount(): void {
    this.workspaceService.closeListener();
  }

  setDevonfwWorkspaces(dirs: string): void {
    this.setState({
      workspaceDir: dirs,
    });
  }

  createProjectHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: INodeInitializerForm = this.state;

    this.context.dispatch({
      type: 'SET_PROJECT_DATA',
      payload: {
        projectData: {
          name: formData.formControls.name.value.toLowerCase(),
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
        ValidateForm.checkValidity(element, event.target.id);
      }
      formState.name = element;
    }

    this.setState({
      formControls: formState,
      formIsValid: ValidateForm.nodeFormStateValidity(formState),
    });
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
        </Grid>
        <div className={classes.action}>
          <Link href="/project-creation">
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
