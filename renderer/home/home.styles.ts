import makeStyles from '@material-ui/core/styles/makeStyles';

export const useGridStyles = makeStyles({
  ideDetails: {
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '6px',
    display: 'flex',
    fontSize: '20px',
    justifyContent: 'space-evenly',
    color: '#0075B3',
    paddingTop: '1em',
  },
  showChartIcon: {
    fontWeight: 'bold',
    color: '#4CBDEC',
  },
  projectDetails: {
    display: 'flex',
    flexDirection: 'column',
    color: '#0075B3',
    width: '60%',
  },
  projectInfo: {
    marginTop: '3em',
    paddingRight: '4em',
  },
  cardRoot: {
    display: 'flex',
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
  },
  cardCover: {
    width: 293,
    height: 197,
  },
});
