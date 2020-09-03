import { FormType } from '../../../../../../models/dashboard/FormType';
import rulesDetails from './rulesDetails';
import { JavaFormControls } from '../../../../../../models/dashboard/IJavaInitializer';
import { NodeFormControls } from '../../../../../../models/dashboard/INodeInitializer';

class ValidateForm {
  static checkValidity(
    control: FormType,
    controlName: string,
    workspaceDir?: string[]
  ): void {
    const rules = control.validation;
    let isValid = true;
    if (rules && rules.required) {
      isValid = control.value.trim() !== '' && isValid;
      control.error = rulesDetails[controlName]['required'];
    }
    if (control.value && rules && rules.pattern) {
      isValid = control.value.match(rules.pattern) !== null && isValid;
      control.error = rulesDetails[controlName]['pattern'];
    }

    if (control.value && rules && rules.existing) {
      if (
        workspaceDir &&
        workspaceDir.filter(
          (project) => project.toLowerCase() === control.value.toLowerCase()
        ).length
      ) {
        isValid = false;
        control.error = rulesDetails[controlName]['existing'];
      }
    }

    if (isValid) {
      control.error = '';
    }
    control.valid = isValid;
  }

  static javaFormStateValidity(formControls: JavaFormControls): boolean {
    let formIsValid = true;
    Object.values(formControls).map((formControl: FormType) => {
      formIsValid = formControl.valid && formIsValid;
    });
    return formIsValid;
  }

  static nodeFormStateValidity(formControls: NodeFormControls): boolean {
    let formIsValid = true;
    Object.values(formControls).map((formControl: FormType) => {
      formIsValid = formControl.valid && formIsValid;
    });
    return formIsValid;
  }
}

export default ValidateForm;
