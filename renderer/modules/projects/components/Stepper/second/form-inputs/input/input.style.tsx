import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const inputStyle = (theme: Theme) =>
  createStyles({
    inputElement: {
      color: theme.palette.error.main,
    },
    invalid: {
      '& label': {
        color: `${theme.palette.error.main} !important`,
      },
      '& input': {
        color: `${theme.palette.error.main} !important`,
      },
      '& fieldset': {
        border: `1px solid ${theme.palette.error.main} !important`,
      },
    },
  });

const inputElementStyle = makeStyles(inputStyle);

export default inputElementStyle;
