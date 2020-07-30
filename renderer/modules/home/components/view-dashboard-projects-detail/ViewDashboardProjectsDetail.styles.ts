import makeStyles from '@material-ui/core/styles/makeStyles';

export const useDashboardDetailsStyles = makeStyles({
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
});
