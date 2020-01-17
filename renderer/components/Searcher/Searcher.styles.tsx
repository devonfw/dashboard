import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useSearcherStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginBottom: theme.spacing(2),
        width: '100%',
      },
    },
  }),
);
