import makeStyles from '@material-ui/core/styles/makeStyles';

export const useProfilePictureStyles = makeStyles({
  customDrawerContainer: {
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
  },
  customDrawerRoot: {
    display: 'flex',
    flex: '1 0 auto',
  },
  customDrawerContent: {
    flex: '1 0 auto',
  },
  customDrawerCover: {
    width: 94,
    height: 94,
    borderRadius: '50%',
    marginLeft: 24,
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
  },
  role: {
    lineHeight: 1,
  },
});
