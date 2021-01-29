interface Rules {
  required: string;
  pattern: string;
  existing: string;
}

const rulesDetails: { [key: string]: Rules } = {
  name: {
    required: 'Please provide a value',
    pattern: 'Please remove special characters and numeric numbers',
    existing: 'Name already exists',
  },
  group: {
    required: 'Please provide a value',
    pattern: 'Group name should be like ( ex: com.example.group )',
    existing: '',
  },
  artifact: {
    required: 'Please provide a value',
    pattern: 'Please remove special characters and numeric numbers',
    existing: 'Artifact name already exists',
  },
  version: {
    required: 'Please provide a value',
    pattern: '',
    existing: '',
  },
};

export default rulesDetails;
