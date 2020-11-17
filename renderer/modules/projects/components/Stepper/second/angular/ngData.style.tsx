import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const projectCardStyle = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      'flex-direction': 'column',
      '& .MuiFormControl-root': {
        width: '100%',
      },
    },
    action: {
      marginTop: theme.spacing(2),
      display: 'flex',
      '& button': {
        marginRight: theme.spacing(2),
        width: '75px',
      },
      '& .MuiButton-containedSizeSmall': {
        padding: '7px 10px',
      },
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
    error: {
      color: theme.palette.error.main,
    },
  });

const ngDataStyle = makeStyles(projectCardStyle);

export default ngDataStyle;
