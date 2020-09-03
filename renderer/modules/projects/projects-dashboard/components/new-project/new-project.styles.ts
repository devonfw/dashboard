import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useNewProjectStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardMedia: {
      width: '190px',
      height: '156px',
      backgroundSize: 'contain',
    },
    cardContent: {
      paddingTop: theme.spacing(0.5),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(0.5),
      paddingLeft: theme.spacing(2),
    },
  })
);

export default useNewProjectStyles;
