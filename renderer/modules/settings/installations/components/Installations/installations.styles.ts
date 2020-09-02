import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useInstallationsStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2),
    },
    form: {
      float: 'right',
      width: '50%',
    },
    textField: {
      width: '100%',
    },
    link: {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      padding: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
    },
  })
);

export default useInstallationsStyles;
