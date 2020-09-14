import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';
import { ProfileData } from '../../../../models/dashboard/profile-data';

import Grid from '@material-ui/core/Grid';
import WelcomeSnippet from '../welcome-snippet/welcome-snippet';
import DownloadDevonfw from '../download-devonfw/download-devonfw';

export default function WelcomeToDevonfw(): JSX.Element {
  const [avatar, setAvatar] = useState('male.svg');

  useEffect(() => {
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

    return () => {
      global.ipcRenderer.removeAllListeners('get:profile');
    };
  });

  return (
    <Grid container spacing={3} style={{ fontSize: '16px' }}>
      <Grid item xs={12}>
        <img src={'/static/assets/' + avatar} alt="admin" />
      </Grid>
      <Grid item xs={12} md={7}>
        <>
          <WelcomeSnippet></WelcomeSnippet>
          <DownloadDevonfw></DownloadDevonfw>
        </>
      </Grid>
    </Grid>
  );
}
