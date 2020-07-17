import { INodeInitializerForm } from '../../../../models/dashboard/INodeInitializer';

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
        pattern: /^[a-z]*$/gi,
        existing: true,
      },
      valid: false,
      touched: false,
      error: '',
    },
    devonInstances: {
      elementType: 'select',
      value: '',
    },
    formIsValid: false,
  },
};

export default nodeProjectConfig;
