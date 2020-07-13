const rulesDetails = {
    group: {
        required: 'Please provide a value',
        pattern: 'Group name should be like ( ex: com.example.group )'
    },
    artifact: {
        required: 'Please provide a value',
        pattern: 'Please remove special characters',
        existing: 'Artifact name already exist'
    },
    version: {
        required: 'Please provide a value'
    },
    packageName: {
        required: 'Please provide a value'
    }
}

export default rulesDetails;