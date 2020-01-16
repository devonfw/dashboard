import { createStyles, makeStyles, Theme } from './node_modules/@material-ui/core/styles';

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
