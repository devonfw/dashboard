import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useButtonLinkStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
      padding: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
    },
  })
);

export default useButtonLinkStyles;
