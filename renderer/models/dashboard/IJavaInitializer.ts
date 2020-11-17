import { FormType } from './FormType';

export interface IJavaInitializerForm {
  workspaceDir: string[];
  formControls: JavaFormControls;
  batchProcessControl: { batch: boolean };
  formIsValid: boolean;
  workspace: string;
}

export interface JavaFormControls {
  group: FormType;
  artifact: FormType;
  packageName: FormType;
  version: FormType;
  db: FormType;
}
