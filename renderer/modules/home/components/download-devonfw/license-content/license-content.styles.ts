import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

export const useLicenseContentStyles = makeStyles(() =>
  createStyles({
    license: {
      maxHeight: '450px',
      overflowY: 'auto',
      '& ::-webkit-scrollbar': {
        width: '10px',
      },

      '& ::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },

      '& ::-webkit-scrollbar-thumb': {
        background: '#888',
      },

      '& ::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    },
  })
);

export default useLicenseContentStyles;
