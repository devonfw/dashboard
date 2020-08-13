import { Component, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/styles';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { StepperContext } from '../../../../redux/stepper/stepperContext';
import {
  IJavaInitializerForm,
  FormControls,
} from '../../../../../../models/dashboard/IJavaInitializer';
import javaInitializerStyle from './javaInitializerStyle';
import NgDataDevonInstances from '../angular/ng-data/NgDataDevonInstances';
import javaProjectConfig from './javaInitializerFormConfig';
import Input from '../input/Input';
import ValidateForm from '../validation/ValidateForm';
import {
  FormType,
  ValueType,
} from '../../../../../../models/dashboard/FormType';
import { NextStepAction } from '../../../../redux/stepper/actions/step-action';
import { ProjectDataActionData } from '../../../../redux/stepper/actions/project-data-action';

interface JavaStyle {
  classes: {
    root: string;
    error: string;
    action: string;
  };
}

class JavaInitializer extends Component<JavaStyle> {
  static contextType = StepperContext;
  state: IJavaInitializerForm = javaProjectConfig;

  createProjectHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: IJavaInitializerForm = this.state;

    this.context.dispatch(
      new ProjectDataActionData({
        name: formData.formControls.artifact.value,
        path: formData.formControls.devonInstances.value,
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

    if (formData.formControls.batch) {
      specificArgs['-Dbatch'] = 'batch';
    }

    return specificArgs;
  };

  groupHandler = (value: string): void => {
    const updatedForm: FormControls = {
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
      formIsValid: ValidateForm.formStateValidity(updatedForm),
    });
  };

  artifactHandler = (value: string) => {
    const updatedForm: FormControls = {
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
      formIsValid: ValidateForm.formStateValidity(updatedForm),
    });
  };

  handleDevonInstancesSelection = (option: string) => {
    this.eventHandler('devonInstances', option);
  };

  eventHandler(identifier: string, value: string): void {
    const formState: FormControls = {
      ...this.state.formControls,
    };
    const element: FormType = { ...formState[identifier] };
    element.touched = true;
    element.value = value;
    if (element.validation) {
      ValidateForm.checkValidity(element, identifier);
    }
    formState[identifier] = element;

    this.setState({
      formControls: formState,
      formIsValid: ValidateForm.formStateValidity(formState),
    });
  }

  updateFormState = (args: ValueType): void => {
    switch (args.identifier) {
      case 'group':
        return this.groupHandler(args.event ? args.event.target.value : '');
      case 'artifact':
        return this.artifactHandler(args.event ? args.event.target.value : '');
      default:
        return this.eventHandler(
          args.identifier,
          args.event ? args.event.target.value : args.value ? args.value : ''
        );
    }
  };

  setDevonWorkspace = (dir: string[]): void => {
    this.resetForm();
    this.setState({
      workspaceDir: dir,
    });
  };

  setActiveState = (): void => {
    this.context.dispatch({
      type: 'RESET_STEP',
    });
  };

  handleBatchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const formState: FormControls = {
      ...this.state.formControls,
    };
    let batchControl = this.state.formControls.batch;
    batchControl = event.target.checked;
    formState.batch = batchControl;
    this.setState({ formControls: formState });
  };

  resetForm = (): void => {
    const formState: FormControls = {
      ...this.state.formControls,
    };
    for (const key in formState) {
      if (formState[key].elementType === 'search') {
        const control: FormType = formState[key];
        control.value = '';
        if (control.touched) {
          control.touched = false;
        }
        if (control.error) {
          control.error = '';
        }
        if (control.valid) {
          control.valid = false;
        }
        formState[key] = control;
      }
    }
    this.setState({ formControls: formState, formIsValid: false });
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
    const form = (
      <form className={classes.root} onSubmit={this.createProjectHandler}>
        {formElementsArray.map((formElement) => {
          return formElement.id !== 'devonInstances' ? (
            <div className="formControl" key={formElement.id}>
              <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                disabled={formElement.config.disabled}
                changed={(event: ChangeEvent<HTMLInputElement>) =>
                  this.updateFormState({
                    event: event,
                    identifier: formElement.id,
                  })
                }
              />
              {formElement.config.error ? (
                <div className={classes.error}>{formElement.config.error}</div>
              ) : null}
            </div>
          ) : (
            <div
              key={formElement.id}
              className="formControl"
              style={{ marginLeft: '8px' }}
            >
              <NgDataDevonInstances
                onSelected={this.handleDevonInstancesSelection}
                devonWorkspace={this.setDevonWorkspace}
              ></NgDataDevonInstances>
            </div>
          );
        })}
        <div className="formControl">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.formControls.batch}
                onChange={this.handleBatchChange}
                name="batch"
                color="primary"
              />
            }
            label="Do you need batch process?"
          />
        </div>
        <div className={classes.action}>
          <Link href="/start">
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
    return <div>{form}</div>;
  }
}
export default withStyles(javaInitializerStyle)(JavaInitializer);
