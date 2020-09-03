const nodeInitializerStyle = {
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .error': {
      color: 'red',
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
};

export default nodeInitializerStyle;
