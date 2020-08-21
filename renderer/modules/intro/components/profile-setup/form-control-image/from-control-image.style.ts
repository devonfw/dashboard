import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useProfileControlImageStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageUploadButton: {
      padding: 0,
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    imageUploadIcon: {
      color: theme.palette.primary.main,
      width: theme.spacing(12),
      height: theme.spacing(12),
      border: '1px solid',
      borderRadius: '50%',
    },
    avatar: {
      cursor: 'pointer',
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  })
);

export default useProfileControlImageStyles;
