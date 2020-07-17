import { Component, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { withStyles } from '@material-ui/styles';
import {
  FormControl,
  Button,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { StepperContext } from '../../redux/stepperContext';
import {
  INodeInitializerForm,
  FormControls,
} from '../../../../models/dashboard/INodeInitializer';
import nodeInitializerStyle from './nodeInitializerStyle';
import NgDataDevonInstances from '../angular/ng-data/NgDataDevonInstances';
import nodeProjectConfig from './nodeInitializerFormConfig';
import Input from '../input/Input';
import rulesDetails from '../validation/rulesDetails';
import ValidateForm from '../validation/ValidateForm';
import { FormType } from '../../../../models/dashboard/FormType';

class NodeInitializer extends Component {
  static contextType = StepperContext;
  state: INodeInitializerForm = nodeProjectConfig;

  createProjectHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: INodeInitializerForm = this.state;
    this.context.dispatch({
      type: 'SET_STACK_CMD',
      payload: {
        stackCmd: `devon node create ${formData.formControls.name.value.toLowerCase()} -n`,
      },
    });
    this.context.dispatch({
      type: 'SET_STACK_CWD',
      payload: {
        stackCwd: `${formData.formControls.devonInstances.value}`,
      },
    });
    this.context.dispatch({
      type: 'NEXT_STEP',
    });
  };

  handleDevonInstancesSelection = (option: string) => {
    this.eventHandler('devonInstances', option);
  };

  eventHandler(identifier: string, value: string) {
    console.log(identifier);
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

    formState.formIsValid = ValidateForm.formStateValidity(formState);

    this.setState({
      formControls: formState,
    });
  }

  setDevonWorkspace = (dir: string[]) => {
    this.resetForm();
    this.setState({
      workspaceDir: dir,
    });
  };

  setActiveState = () => {
    this.context.dispatch({
      type: 'RESET_STEP',
    });
  };

  resetForm = () => {
    const formState: FormControls = {
      ...this.state.formControls,
    };
    for (let key in formState) {
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
    this.setState({ formControls: formState });
  };

  render() {
    const { classes } = this.props;
    const formElementsArray = [];
    for (let key in this.state.formControls) {
      if (this.state.formControls[key].elementType) {
        formElementsArray.push({
          id: key,
          config: this.state.formControls[key],
        });
      }
    }
    let form = (
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
                  this.eventHandler(formElement.id, event.target.value)
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
            disabled={!this.state.formControls.formIsValid}
          >
            Next
          </Button>
        </div>
      </form>
    );
    return <div>{form}</div>;
  }
}
export default withStyles(nodeInitializerStyle)(NodeInitializer);
