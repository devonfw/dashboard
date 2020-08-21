import TextField from '@material-ui/core/TextField';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

const WhiteTextField = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '& label': {
        backgroundColor: theme.palette.secondary.main,
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
        backgroundColor: theme.palette.secondary.main,
      },
      '& .MuiOutlinedInput-input': {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
    },
  })
)(TextField);

export default WhiteTextField;
