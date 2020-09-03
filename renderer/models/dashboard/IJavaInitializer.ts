import { FormType } from './FormType';

export interface IJavaInitializerForm {
  workspaceDir: string[];
  formControls: JavaFormControls;
  batchProcessControl: { batch: boolean };
  formIsValid: boolean;
}

export interface JavaFormControls {
  group: FormType;
  artifact: FormType;
  packageName: FormType;
  version: FormType;
  db: FormType;
}
