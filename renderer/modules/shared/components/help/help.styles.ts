import { Theme, makeStyles } from '@material-ui/core/styles';

const useHelpStyles = makeStyles((theme: Theme) => ({
  arrow: {
    color: theme.palette.secondary.main,
  },
  tooltip: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    maxWidth: 500,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '8px',
  },
  list: {
    margin: 0,
    paddingLeft: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export default useHelpStyles;
