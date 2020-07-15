import { FormType, FormControls } from "../../../../../models/dashboard/IJavaInitializer";
import rulesDetails from "../rulesDetails";

class ValidateJavaForm {
    static checkValidity(control: FormType, controlName: string, workspaceDir?: string[]): void {
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
            if (workspaceDir && workspaceDir.includes(control.value)) {
                isValid = false;
                control.error = rulesDetails[controlName]['existing'];
            }
        }

        if (isValid) {
            control.error = ''
        }
        control.valid = isValid;
    }

    static formStateValidity(formControls: any): boolean {
        let formIsValid = true;
        for (let inputIdentifier in formControls) {
            if (formControls[inputIdentifier].valid !== undefined) {
                formIsValid = formControls[inputIdentifier].valid && formIsValid;
            }
        }
        return formIsValid;
    }

}

export default ValidateJavaForm;