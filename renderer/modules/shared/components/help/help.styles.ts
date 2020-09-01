import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useHelpStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: 0,
      paddingLeft: theme.spacing(4),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);

export default useHelpStyles;
