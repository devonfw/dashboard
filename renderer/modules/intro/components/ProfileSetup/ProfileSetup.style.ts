import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '6rem 0 2rem 1rem',
      marginLeft: '100px',
      width: '560px',
    },
    formControl: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
    formLabel: {
      marginBottom: theme.spacing(2),
      fontWeight: theme.typography.fontWeightBold,
    },
    checkedIcon: {
      color: '#0075B3',
    },
    textField: {
      width: '70%',
    },
    radioGroup: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    fileInput: {
      display: 'none',
    },
    imageUploadButton: {
      padding: '0',
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    imageUploadIcon: {
      color: '#0075B3',
      width: theme.spacing(12),
      height: theme.spacing(12),
      border: '1px solid',
      borderRadius: '50%',
    },
    avatar: {
      cursor: 'pointer',
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    radioImage: {
      width: '210px',
      height: '140px',
      position: 'relative',
      left: '-30px',
      cursor: 'pointer',
    },
    button: {
      backgroundColor: '#0075B3',
      color: '#FFFFFF',
      marginRight: theme.spacing(2),
    },
  })
);

export default useStyles;
