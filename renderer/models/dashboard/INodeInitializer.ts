import { FormType } from './FormType';

export interface INodeInitializerForm {
  workspaceDir: string[];
  formControls: FormControls | any;
  formIsValid: boolean;
}

export interface FormControls {
  name: FormType;
  devonInstances: FormType;
}
