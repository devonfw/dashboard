import { makeStyles, createStyles } from '@material-ui/core/styles';

const inputStyle = () =>
  createStyles({
    capitalize: {
      textTransform: 'capitalize',
    },
  });

const inputElementStyle = makeStyles(inputStyle);

export default inputElementStyle;
