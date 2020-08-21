import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Spinner from '../../../shared/components/spinner/spinner';
import AcceptButton from '../../../shared/components/accept-button/accept-button';
import WelcomeSnippet from '../welcome-snippet/welcome-snippet';

import { ProfileData } from '../../../../models/dashboard/profile-data';

const DASHBOARD_DOWNLOAD_URL =
  'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';

export default function WelcomeToDevonfw(): JSX.Element {
  const [avatar, setAvatar] = useState('male.svg');
  const [, setTotal] = useState(0);
  const [, setReceived] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(false);
  const [downloadStatusMsg, setDownloadStatusMsg] = useState('');
  const [downloadStatusMsgColor, setDownloadStatusMsgColor] = useState(
    'error.main'
  );

  useEffect(() => {
    global.ipcRenderer.on(
      'download progress',
      (_: IpcRendererEvent, arg: { total: number; received: number }) => {
        setTotal(arg.total);
        setReceived(arg.received);
        setDownloadStatusMsg('');
      }
    );

    global.ipcRenderer.on(
      'download completed',
      (_: IpcRendererEvent, arg: string) => {
        if (downloadProgress) {
          setDownloadProgress(false);
          setDownloadStatusMsg('Download was ' + arg + '.');
          if (arg === 'completed') {
            setDownloadStatusMsgColor('success.main');
          } else {
            setDownloadStatusMsgColor('error.main');
          }
        }
      }
    );

    global.ipcRenderer.send('find:profile');

    global.ipcRenderer.on(
      'get:profile',
      (_: IpcRendererEvent, data: ProfileData) => {
        if (data.gender !== '') {
          const avatarImg = data.gender + '.svg';
          setAvatar(avatarImg);
        }
      }
    );
  });

  return (
    <Grid container spacing={3} style={{ fontSize: '16px' }}>
      <Grid item xs={12}>
        <img src={'/assets/' + avatar} alt="admin" />
      </Grid>
      <Grid item xs={7}>
        <>
          <WelcomeSnippet></WelcomeSnippet>
          <AcceptButton
            onClick={() => setDownloadProgress(true)}
            href={DASHBOARD_DOWNLOAD_URL}
            disabled={downloadProgress}
          >
            Download latest version
          </AcceptButton>
          <Spinner inProgress={downloadProgress}></Spinner>
          {/* TODO: implement alternative way to handle download */}
          {/* <Box component="p" color={downloadStatusMsgColor}>
            {downloadStatusMsg}
          </Box> */}
        </>
      </Grid>
    </Grid>
  );
}
