import { Component, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { StepperContext } from '../../../../redux/stepper/stepperContext';
import {
  INodeInitializerForm,
  FormControls,
} from '../../../../../../models/dashboard/INodeInitializer';
import nodeInitializerStyle from './nodeInitializerStyle';
import nodeProjectConfig from './nodeInitializerFormConfig';
import Input from '../input/Input';
import ValidateForm from '../validation/ValidateForm';
import { FormType } from '../../../../../../models/dashboard/FormType';
import { NextStepAction } from '../../../../redux/stepper/actions/step-action';
import { WorkspaceService } from '../../../../services/workspace.service';

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

  eventHandler(identifier: string, value: string) {
    const formState: FormControls = {
      ...this.state.formControls,
    };
    const element: FormType = { ...formState[identifier] };
    element.touched = true;
    element.value = value;
    if (element.validation) {
      ValidateForm.checkValidity(element, identifier, this.state.workspaceDir);
    }
    formState[identifier] = element;

    this.setState({
      formControls: formState,
      formIsValid: ValidateForm.formStateValidity(formState),
    });
  }

  setActiveState = () => {
    this.context.dispatch({
      type: 'RESET_STEP',
    });
  };

  render() {
    const { classes } = this.props;
    const formElementsArray = [];
    for (const key in this.state.formControls) {
      if (this.state.formControls[key].elementType) {
        formElementsArray.push({
          id: key,
          config: this.state.formControls[key],
        });
      }
    }
    return (
      <form className={classes.root} onSubmit={this.createProjectHandler}>
        <Grid container spacing={4}>
          {formElementsArray.map((formElement) => {
            return formElement.id !== 'devonInstances' ? (
              <Grid item xs={12} key={formElement.id}>
                <Input
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  disabled={formElement.config.disabled}
                  changed={(event: ChangeEvent<HTMLInputElement>) =>
                    this.eventHandler(formElement.id, event.target.value)
                  }
                />
                {formElement.config.error ? (
                  <div className={classes.error}>
                    {formElement.config.error}
                  </div>
                ) : null}
              </Grid>
            ) : null;
          })}
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
