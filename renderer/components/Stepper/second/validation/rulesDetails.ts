const rulesDetails = {
    name: {
        required: 'Please provide a value',
        pattern: 'Please remove special characters and numeric numbers',
        existing: 'Artifact name already exist'
    },
    group: {
        required: 'Please provide a value',
        pattern: 'Group name should be like ( ex: com.example.group )'
    },
    artifact: {
        required: 'Please provide a value',
        pattern: 'Please remove special characters and numeric numbers',
        existing: 'Artifact name already exist'
    },
    version: {
        required: 'Please provide a value',
    }
}

export default rulesDetails;