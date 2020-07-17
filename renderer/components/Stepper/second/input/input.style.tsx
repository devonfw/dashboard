import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const inputStyle = (theme: Theme) =>
  createStyles({
    inputElement: {
      color: 'red',
    },
    invalid: {
      '& label': {
        color: 'red !important',
      },
      '& input': {
        color: 'red !important',
      },
      '& fieldset': {
        border: '1px solid red !important',
      },
    },
  });

const inputElementStyle = makeStyles(inputStyle);

export default inputElementStyle;
