import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';
import { ProfileData } from '../../../../models/dashboard/profile-data';
import Grid from '@material-ui/core/Grid';
import WelcomeSnippet from '../welcome-snippet/welcome-snippet';
import DownloadDevonfw from '../../../shared/components/download-devonfw/download-devonfw';

const DASHBOARD_DOWNLOAD_URL =
  'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';

export default function WelcomeToDevonfw(): JSX.Element {
  const [avatar, setAvatar] = useState('male.svg');

  useEffect(() => {
    global.ipcRenderer.invoke('find:profile').then((profile: ProfileData) => {
      if (profile.gender !== '') {
        const avatarImg = profile.gender + '.svg';
        setAvatar(avatarImg);
      }
    });

    return () => {
      global.ipcRenderer.removeAllListeners('find:profile');
    };
  }, []);

  return (
    <Grid container spacing={3} style={{ fontSize: '16px' }}>
      <Grid item xs={12}>
        <img src={'/static/assets/' + avatar} alt="admin" />
      </Grid>
      <Grid item xs={12} md={7}>
        <>
          <WelcomeSnippet></WelcomeSnippet>
          <DownloadDevonfw url={DASHBOARD_DOWNLOAD_URL}>
            DOWNLOAD LATEST VERSION
          </DownloadDevonfw>
        </>
      </Grid>
    </Grid>
  );
}
