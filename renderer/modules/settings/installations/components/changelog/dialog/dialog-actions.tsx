import { Theme, withStyles } from '@material-ui/core/styles';

import MuiDialogActions from '@material-ui/core/DialogActions';

export const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2.5),
  },
}))(MuiDialogActions);

export default DialogActions;
