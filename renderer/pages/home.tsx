import { useEffect, useState } from 'react';
import ResponsiveDrawer from '../components/responsive-drawer/ResponsiveDrawer';
import SpaceAround from '../hoc/SpaceAround';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { IpcRendererEvent } from 'electron';
import ViewDashboardProjectsDetail from '../components/view-dashboard-projects-detail/ViewDashboardProjectsDetail';

const useStyles = makeStyles({
  spinner: {
    verticalAlign: 'middle',
    marginTop: '16px',
    marginLeft: '16px',
  },
  button: {
    marginTop: '16px',
    backgroundColor: '#0075B3',
    color: '#FFFFFF',
  },
});

const useGridStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundImage: 'url("/assets/mask_logo.png")',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '460px 749px',
    minHeight: 720,
    backgroundPositionY: '1em',
  },
  dashboardInfo: {
    flexGrow: 1,
    backgroundImage: 'url("/assets/delivery-lifecycle.png")',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '700px 535px',
    backgroundPositionY: '7em',
    minHeight: 720,
  },
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

export default function Home(): JSX.Element {
  const classes = useStyles();
  const gridClasses = useGridStyles();

  const [total, setTotal] = useState(0);
  const [received, setReceived] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [downloadStatusMsg, setDownloadStatusMsg] = useState('');
  const [downloadStatusMsgColor, setDownloadStatusMsgColor] = useState(
    'error.main'
  );
  const [totalInstances, setTotalInstances] = useState(0);

  const spinner = downloadProgress ? (
    <CircularProgress
      variant="static"
      className={classes.spinner}
      value={(received / total) * 100}
    ></CircularProgress>
  ) : null;

  const downloadUrl =
    'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';

  useEffect(() => {
    global.ipcRenderer.on(
      'download progress',
      (event: IpcRendererEvent, arg: { total: number; received: number }) => {
        setTotal(arg.total);
        setReceived(arg.received);
        setDownloadProgress(true);
        setDownloadStatusMsg('');
      }
    );
    global.ipcRenderer.on(
      'download completed',
      (event: IpcRendererEvent, arg: string) => {
        setDownloadProgress(false);
        setDownloadStatusMsg('Download was ' + arg + '.');
        if (arg === 'completed') {
          setDownloadStatusMsgColor('success.main');
        } else {
          setDownloadStatusMsgColor('error.main');
        }
      }
    );
    global.ipcRenderer.send('find:devonfw');
    global.ipcRenderer.on(
      'count:instances',
      (event: IpcRendererEvent, arg: { total: number }) => {
        setTotalInstances(arg.total);
      }
    );
  }, []);
  return (
    <ResponsiveDrawer>
      <SpaceAround>
        <div className={gridClasses.root}>
          <div className={gridClasses.dashboardInfo}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className={gridClasses.cardRoot}>
                  <Card>
                    <CardMedia
                      className={gridClasses.cardCover}
                      image="/assets/person.png"
                      title="admin"
                    />
                  </Card>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ fontSize: '16px' }}>
                  <h1>Welcome to devonfw-ide!</h1>
                  <p>
                    The devonfw-ide is a fantastic tool to automatically
                    download, install, setup and update the IDE (integrated
                    development environment) of your software development
                    projects.
                  </p>
                  <p>For further details visit the following links:</p>
                  <ul style={{ fontWeight: 'bold' }}>
                    <li>
                      <a>features &amp; motivation</a>
                    </li>
                    <li>
                      <a>download &amp; setup</a>
                    </li>
                    <li>
                      <a>usage</a>
                    </li>
                  </ul>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={downloadProgress}
                    size="large"
                    className={classes.button}
                    href={downloadUrl}
                  >
                    Download latest version
                  </Button>
                  {spinner}
                  <Box component="p" color={downloadStatusMsgColor}>
                    {downloadStatusMsg}
                  </Box>
                </div>
              </Grid>
              <Grid item xs={6}></Grid>
            </Grid>
          </div>
          <div className={gridClasses.projectInfo}>
            <Grid container spacing={3}>
              <ViewDashboardProjectsDetail
                title={'Created Project'}
                total={totalInstances}
              />
            </Grid>
          </div>
        </div>
      </SpaceAround>
    </ResponsiveDrawer>
  );
}
