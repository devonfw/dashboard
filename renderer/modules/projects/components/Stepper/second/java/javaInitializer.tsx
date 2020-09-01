import { Component, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { StepperContext } from '../../../../redux/stepper/stepperContext';
import { IJavaInitializerForm } from '../../../../../../models/dashboard/IJavaInitializer';
import javaInitializerStyle from './javaInitializerStyle';
import javaProjectConfig from './javaInitializerFormConfig';
import ValidateForm from '../validation/ValidateForm';
import {
  FormType,
  ValueType,
} from '../../../../../../models/dashboard/FormType';
import { NextStepAction } from '../../../../redux/stepper/actions/step-action';
import { ProjectDataActionData } from '../../../../redux/stepper/actions/project-data-action';
import { WorkspaceService } from '../../../../services/workspace.service';
import { JavaFormBuider } from './java-form-buider';

interface JavaInitializerProps {
  classes: {
    root: string;
    error: string;
    action: string;
    content: string;
    batch: string;
  };
}

class JavaInitializer extends Component<JavaInitializerProps> {
  state: IJavaInitializerForm = javaProjectConfig;
  workspaceService: WorkspaceService;

  constructor(props: JavaInitializerProps) {
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
    const formData: IJavaInitializerForm = this.state;

    this.context.dispatch(
      new ProjectDataActionData({
        name: formData.formControls.artifact.value,
        specificArgs: this.specificArgs(),
      })
    );

    this.context.dispatch(new NextStepAction());
  };

  specificArgs = () => {
    const formData: IJavaInitializerForm = this.state;

    const specificArgs: {
      [key: string]: string | null | boolean | undefined;
    } = {
      '-DdbType': formData.formControls.db.value,
      '-Dversion': `"${formData.formControls.version.value}"`,
      '-DartifactId': formData.formControls.artifact.value,
      '-DgroupId': `"${formData.formControls.group.value}"`,
      '-Dpackage': `"${formData.formControls.packageName.value}"`,
    };

    if (formData.batchProcessControl.batch) {
      specificArgs['-Dbatch'] = 'batch';
    }

    return specificArgs;
  };

  groupHandler = (value: string): void => {
    const updatedForm = {
      ...this.state.formControls,
    };
    const artifact: FormType = { ...updatedForm.artifact };
    const groupElement: FormType = { ...updatedForm.group };
    const packageName: FormType = { ...updatedForm.packageName };

    groupElement.touched = true;
    groupElement.value = value;
    ValidateForm.checkValidity(groupElement, 'group');

    packageName.value = artifact.value
      ? `${groupElement.value}.${artifact.value}`
      : groupElement.value;

    updatedForm.group = groupElement;
    updatedForm.artifact = artifact;
    updatedForm.packageName = packageName;
    this.setState({
      formControls: updatedForm,
      formIsValid: ValidateForm.javaFormStateValidity(updatedForm),
    });
  };

  artifactHandler = (value: string) => {
    const updatedForm = {
      ...this.state.formControls,
    };
    const artifact: FormType = { ...updatedForm.artifact };
    const groupElement: FormType = { ...updatedForm.group };
    const packageName: FormType = { ...updatedForm.packageName };

    artifact.value = value;
    ValidateForm.checkValidity(artifact, 'artifact', this.state.workspaceDir);
    artifact.touched = true;

    packageName.value = groupElement.value
      ? `${groupElement.value}.${artifact.value}`
      : artifact.value;

    updatedForm.artifact = artifact;
    updatedForm.packageName = packageName;
    this.setState({
      formControls: updatedForm,
      formIsValid: ValidateForm.javaFormStateValidity(updatedForm),
    });
  };

  eventHandler(identifier: string, value: string): void {
    const formState = {
      ...this.state.formControls,
    };
    if (identifier === 'version') {
      const element = { ...formState.version };
      element.touched = true;
      element.value = value;
      if (element.validation) {
        ValidateForm.checkValidity(element, identifier);
      }
      formState.version = element;
    }

    if (identifier === 'db') {
      const element = { ...formState.db };
      element.value = value;
      formState.db = element;
    }

    this.setState({
      formControls: formState,
      formIsValid: ValidateForm.javaFormStateValidity(formState),
    });
  }

  updateFormState = (formChangeState: ValueType): void => {
    switch (formChangeState.identifier) {
      case 'group':
        return this.groupHandler(
          formChangeState.event ? formChangeState.event.target.value : ''
        );
      case 'artifact':
        return this.artifactHandler(
          formChangeState.event ? formChangeState.event.target.value : ''
        );
      default:
        return this.eventHandler(
          formChangeState.identifier,
          formChangeState.event ? formChangeState.event.target.value : ''
        );
    }
  };

  setActiveState = (): void => {
    this.context.dispatch({
      type: 'RESET_STEP',
    });
  };

  handleBatchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const formState: { batch: boolean } = {
      ...this.state.batchProcessControl,
    };
    let batchControl = this.state.batchProcessControl.batch;
    batchControl = event.target.checked;
    formState.batch = batchControl;
    this.setState({ batchProcessControl: formState });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.createProjectHandler}>
        <Grid container spacing={4}>
          <Grid item xs={12} className={classes.content}>
            <JavaFormBuider
              formControls={this.state.formControls}
              updateFormState={this.updateFormState}
            />
          </Grid>
          <Grid item xs={12} className={classes.batch}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.batchProcessControl.batch}
                  onChange={this.handleBatchChange}
                  name="batch"
                  color="primary"
                />
              }
              label="Do you need batch process?"
            />
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
JavaInitializer.contextType = StepperContext;

export default withStyles(javaInitializerStyle)(JavaInitializer);
