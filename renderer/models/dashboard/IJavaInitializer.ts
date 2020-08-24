import { FormType } from './FormType';

export interface IJavaInitializerForm {
  workspaceDir: string[];
  formControls: FormControls | any;
  formIsValid: boolean;
}

export interface FormControls {
  group: FormType;
  artifact: FormType;
  packageName: FormType;
  version: FormType;
  db: FormType;
  devonInstances: FormType;
  batch: boolean;
}
