import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useProfileFormControlStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
    formLabel: {
      marginBottom: theme.spacing(2),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export default useProfileFormControlStyles;
