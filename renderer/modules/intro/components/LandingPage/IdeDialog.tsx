import { Theme, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Avatar from '@material-ui/core/Avatar';
import { IdeInstallations } from './LandingPage';

const DialogTitle = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#0075B3',
    color: '#FFFFFF',
  },
}))(MuiDialogTitle);

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: '#0075B3',
  },
}))(MuiDialogActions);

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#81CF08',
    color: '#FFFFFF',
    float: 'left',
  },
  titleText: {
    fontSize: '0.9em',
    lineHeight: '1.3',
    margin: '0 0 0 56px',
  },
  listItem: {
    display: 'block',
    padding: '0',
    fontWeight: 'bold',
    marginBottom: '32px',
  },
  button: {
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
});

interface IdeDialogProps {
  data: IdeInstallations[];
  open: boolean;
  onClose: () => void;
}

export default function IdeDialog(props: IdeDialogProps): JSX.Element {
  const classes = useStyles();

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title">
        <Avatar className={classes.avatar}>
          <PlaylistAddCheckIcon />
        </Avatar>
        <p className={classes.titleText}>
          Devon Dashboard detected already existing devon instances in your
          system
        </p>
      </DialogTitle>
      <DialogContent dividers>
        <p>The following are the paths of installed devon instances:</p>
        <List>
          {props.data.map((ide, index) => {
            return (
              <ListItem key={index} className={classes.listItem}>
                <p>Path: {ide.id}</p>
                <p>Version: {ide.ideConfig.version}</p>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={props.onClose}
          variant="outlined"
        >
          Ok Got It
        </Button>
      </DialogActions>
    </Dialog>
  );
}
