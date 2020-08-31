import { FormType } from './FormType';

export interface INodeInitializerForm {
  workspaceDir: string[];
  formControls: FormControls;
  formIsValid: boolean;
}

export interface FormControls {
  name: FormType;
  devonInstances: FormType;
}
