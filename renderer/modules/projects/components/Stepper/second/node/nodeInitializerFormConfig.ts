import { INodeInitializerForm } from '../../../../../../models/dashboard/INodeInitializer';

const nodeProjectConfig: INodeInitializerForm = {
  workspaceDir: [],
  formControls: {
    name: {
      elementType: 'search',
      elementConfig: {
        label: 'Name *',
        id: 'name',
      },
      value: '',
      validation: {
        required: true,
        pattern: /^[a-z](\-*[a-z]\d*)*$/gi,
        existing: true,
      },
      valid: false,
      touched: false,
      error: '',
    },
  },
  formIsValid: false,
  projectsDir: [],
  workspace: 'main',
};

export default nodeProjectConfig;
