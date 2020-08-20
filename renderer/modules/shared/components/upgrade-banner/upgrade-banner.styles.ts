import makeStyles from '@material-ui/core/styles/makeStyles';

export const useUpgradeBannerStyles = makeStyles({
  updateAction: {
    '& a': {
      marginTop: '16px',
      backgroundColor: '#0075B3',
      color: '#FFFFFF',
    },
    '& .MuiButton-containedPrimary': {
      backgroundColor: '#0075B3',
    },
  },
  upgrade: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2em',
    marginBottom: '5em',
  },
  uppercase: {
    textTransform: 'uppercase',
    marginBottom: 2,
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiSvgIcon-root': {
      color: '#0075B3',
      position: 'relative',
      top: '-1px',
    },
  },
});
