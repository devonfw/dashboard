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
  })
);

export default useInstallationsStyles;
