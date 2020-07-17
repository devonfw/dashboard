import { FormType } from './FormType';

export interface IJavaInitializerForm {
  workspaceDir: string[];
  formControls: FormControls;
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
