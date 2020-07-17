import { ChangeEvent } from 'react';
import { FormType } from './FormType';

export interface IJavaInitializerForm {
  workspaceDir: string[];
  formControls: FormControls;
}

export interface FormControls {
  group: FormType;
  artifact: FormType;
  packageName: FormType;
  version: FormType;
  db: FormType;
  devonInstances: FormType;
  formIsValid: boolean;
  batch: boolean;
}
