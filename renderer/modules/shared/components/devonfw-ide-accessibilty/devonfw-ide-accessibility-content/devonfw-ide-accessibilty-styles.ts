import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const devonfwIdeAccessibilityContentStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: '#ff0000',
      marginBottom: theme.spacing(2),
    },
    mt: {
      marginTop: theme.spacing(2),
    },
  })
);

export default devonfwIdeAccessibilityContentStyles;
