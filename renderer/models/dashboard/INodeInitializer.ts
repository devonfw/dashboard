import { FormType } from './FormType';

export interface INodeInitializerForm {
  workspaceDir: string[];
  formControls: NodeFormControls;
  formIsValid: boolean;
}

export interface NodeFormControls {
  name: FormType;
}
