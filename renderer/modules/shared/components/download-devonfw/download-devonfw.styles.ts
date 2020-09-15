import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useDownloadDevonfwStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper': {
        minHeight: '50%',
        minWidth: '700px',
      },
    },
  })
);

export default useDownloadDevonfwStyles;
