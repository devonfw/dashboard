import { createStyles, withStyles } from '@material-ui/core/styles';

export const withSearcherStyles = withStyles(() =>
  createStyles({
    root: {
      '& > *': {
        width: '100%',
      },
    },
  })
);
