const javaInitializerStyle = () => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  action: {
    marginTop: '1em',
    display: 'flex',
    '& button': {
      marginRight: '1em',
      width: '75px',
    },
    '& .MuiButton-containedSizeSmall': {
      padding: '7px 10px',
    },
  },
  error: {
    color: 'red',
  },
});

export default javaInitializerStyle;
