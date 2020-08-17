import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const toolbarStyle = (theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#0075B3',
    },
    logo: {
      width: 169,
      height: 32,
    },
    pageContent: {
      minHeight: '100vh',
    },
  });

const useToolbarStyles = makeStyles(toolbarStyle);

export default useToolbarStyles;
