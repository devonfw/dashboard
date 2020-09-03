import { Theme, withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
  },
}))(MuiDialogContent);

export default DialogContent;
