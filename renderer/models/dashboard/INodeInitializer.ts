import { FormType } from './FormType';

export interface INodeInitializerForm {
  workspaceDir: string[];
  formControls: NodeFormControls;
  formIsValid: boolean;
  projectsDir: string[];
  workspace: string;
}

export interface NodeFormControls {
  name: FormType;
}
