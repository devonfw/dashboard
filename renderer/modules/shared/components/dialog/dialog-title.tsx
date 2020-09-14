import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

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

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
}

export const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

export default DialogTitle;
