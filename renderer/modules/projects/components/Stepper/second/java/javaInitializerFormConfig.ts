import { IJavaInitializerForm } from '../../../../../../models/dashboard/IJavaInitializer';

const javaProjectConfig: IJavaInitializerForm = {
  workspaceDir: [],
  formControls: {
    group: {
      elementType: 'search',
      elementConfig: {
        label: 'Group *',
        id: 'group',
      },
      value: '',
      validation: {
        required: true,
        pattern: /^[a-z](\.*[a-z])*$/gi,
      },
      valid: false,
      touched: false,
      error: '',
    },
    artifact: {
      elementType: 'search',
      elementConfig: {
        label: 'Artifact *',
        id: 'artifact',
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
    packageName: {
      elementType: 'search',
      elementConfig: {
        label: 'Package',
        id: 'package',
      },
      value: '',
      disabled: true,
      touched: true,
      error: '',
      valid: true,
    },
    version: {
      elementType: 'search',
      elementConfig: {
        label: 'Version *',
        id: 'version',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      error: '',
    },
    db: {
      elementType: 'select',
      elementConfig: {
        label: 'Database',
        id: 'db',
      },
      valid: true,
      touched: true,
      value: 'h2',
      error: '',
    },
  },
  batchProcessControl: {
    batch: false,
  },
  formIsValid: false,
};

export default javaProjectConfig;
