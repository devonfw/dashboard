import { FormType } from './FormType';

export interface INodeInitializerForm {
  workspaceDir: string[];
  formControls: FormControls;
}

export interface FormControls {
  name: FormType;
  devonInstances: FormType;
  formIsValid: boolean;
}
