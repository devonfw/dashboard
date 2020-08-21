import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';

const useIdeDialogTitleStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.primary.contrastText,
      float: 'left',
    },
    titleText: {
      fontSize: '0.9em',
      lineHeight: '1.3',
      margin: '0 0 0 56px',
    },
  })
);

export default useIdeDialogTitleStyles;
