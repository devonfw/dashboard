import makeStyles from '@material-ui/core/styles/makeStyles';

export const useModulesInstallerStyles = makeStyles({
  error: {
    color: '#E01600',
  },
  terminal: {
    padding: '16px',
    border: 'solid 2px gray',
    height: '300px',
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    overflowY: 'auto',
  },
});
