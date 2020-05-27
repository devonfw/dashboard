import { useEffect, useState } from 'react';
import ResponsiveDrawer from '../components/responsive-drawer/ResponsiveDrawer';
import SpaceAround from '../hoc/SpaceAround';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { IpcRendererEvent } from 'electron';

const useStyles = makeStyles({
  spinner: {
    verticalAlign: 'middle',
    marginTop: '16px',
    marginLeft: '16px'
  },
  button: {
    marginTop: '16px'
  }
});

export default function Home() {
  const classes = useStyles();

  const [total, setTotal] = useState(0);
  const [received, setReceived] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [downloadStatusMsg, setDownloadStatusMsg] = useState('');
  const [downloadStatusMsgColor, setDownloadStatusMsgColor] = useState('error.main');
  
  let spinner = downloadProgress ? 
    <CircularProgress variant='static' className={classes.spinner} value={received/total*100}></CircularProgress>
    : null;
  
  const downloadUrl = 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';
  
  useEffect(() => {
    global.ipcRenderer.on('download progress', (event: IpcRendererEvent, arg: { total: number, received: number }) => {
      setTotal(arg.total);
      setReceived(arg.received);
      setDownloadProgress(true);
      setDownloadStatusMsg('');
    });
    global.ipcRenderer.on('download completed', (event: IpcRendererEvent, arg: string) => {
      setDownloadProgress(false);
      setDownloadStatusMsg('Download was ' + arg + '.');
      if (arg === 'completed') {
        setDownloadStatusMsgColor('success.main');
      } else {
        setDownloadStatusMsgColor('error.main');
      }
    });
  }, []);

    return (
      <ResponsiveDrawer>
        <SpaceAround>
          <h1>
            Welcome to devonfw-ide!
          </h1>
          <p>
            The devonfw-ide is a fantastic tool to automatically download, install, setup and update the IDE (integrated development environment) of your software development projects.
          </p>
          <p>
            For further details visit the following links:
          </p>
          <ul>
            <li><a>features &amp; motivation</a></li>
            <li><a>download &amp; setup</a></li>
            <li><a>usage</a></li>
          </ul>
          <Button variant="contained" disabled={downloadProgress} color="primary" size="large" className={classes.button} href={downloadUrl}>
            Download latest version
          </Button>
          {spinner}
          <Box component="p" color={downloadStatusMsgColor}>{downloadStatusMsg}</Box>
        </SpaceAround>
      </ResponsiveDrawer>
    )
}