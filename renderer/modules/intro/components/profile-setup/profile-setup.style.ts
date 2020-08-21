import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(12),
      paddingright: 0,
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      marginLeft: '100px',
      width: '560px',
    },
    button: {
      marginRight: theme.spacing(2),
    },
  })
);

export default useStyles;
