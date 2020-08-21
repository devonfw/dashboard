import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useLandingPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(12),
      paddingright: 0,
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      marginLeft: '100px',
      width: '500px',
    },
    welcomeImage: {
      width: '400px',
    },
    welcomeText: {
      width: '400px',
    },
  })
);

export default useLandingPageStyles;
