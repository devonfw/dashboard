import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

const useNavigationStyles = makeStyles(() =>
  createStyles({
    drawer: {
      height: '100%',
    },
  })
);

export default useNavigationStyles;
