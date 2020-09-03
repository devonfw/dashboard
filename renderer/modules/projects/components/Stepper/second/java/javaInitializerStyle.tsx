const javaInitializerStyle = {
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: '0.5em',
    },
    '& .error': {
      color: 'red',
      paddingBottom: '1.5em',
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
  batch: {
    paddingTop: '0 !important',
  },
  content: {
    paddingBottom: '0 !important',
  },
};

export default javaInitializerStyle;
