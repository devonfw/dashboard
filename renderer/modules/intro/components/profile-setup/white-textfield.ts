import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const WhiteTextField = withStyles({
  root: {
    '& label': {
      backgroundColor: '#FFFFFF',
    },
    '& label.MuiFormLabel-filled': {
      padding: '0.2em 0.5em',
      borderRadius: '4px',
    },
    '& label.Mui-focused': {
      padding: '0.2em 0.5em',
      borderRadius: '4px',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFFFFF',
    },
  },
})(TextField);

export default WhiteTextField;
