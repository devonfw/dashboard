import React from 'react';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import AsciidocViewer from '../asciidoct-viewer/asciidoc-viewer';
import { useChangelogStyles } from './changelog.styles';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      paddingTop: theme.spacing(3),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(3),
      paddingLeft: theme.spacing(5),
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2.5),
  },
}))(MuiDialogActions);

interface ChangelogProps {
  open: boolean;
  onClose: () => void;
}

export default function Changelog(props: ChangelogProps): JSX.Element {
  const classes = useChangelogStyles();

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title">Modal title</DialogTitle>
      <DialogContent dividers>
        <AsciidocViewer className={classes.link} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={props.onClose}
          variant="outlined"
          color="secondary"
        >
          OKAY GOT IT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
