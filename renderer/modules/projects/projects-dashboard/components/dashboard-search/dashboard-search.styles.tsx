import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useDashboardSearchStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      width: '200px',
      marginLeft: theme.spacing(3),
    },
    counter: {
      marginRight: theme.spacing(2),
    },
  })
);
