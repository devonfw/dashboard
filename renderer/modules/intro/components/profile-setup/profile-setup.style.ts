import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '6rem 0 2rem 1rem',
      marginLeft: '100px',
      width: '560px',
    },
    rootSettings: {
      padding: '1rem 0 2rem 1rem',
      width: '560px',
    },
    button: {
      backgroundColor: '#0075B3',
      color: '#FFFFFF',
      marginRight: theme.spacing(2),
    },
  })
);

export default useStyles;
