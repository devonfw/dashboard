import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';

import Grid from '@material-ui/core/Grid';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import ViewDashboardProjectsDetail from '../modules/home/components/view-dashboard-projects-detail/ViewDashboardProjectsDetail';
import Background from '../modules/home/components/background/background';
import WelcomeToDevonfw from '../modules/home/components/welcome-to-devonfw/welcome-to-devonfw';

export default function Home(): JSX.Element {
  const [totalInstances, setTotalInstances] = useState(0);

  useEffect(() => {
    global.ipcRenderer.send('find:devonfw');
    global.ipcRenderer.on(
      'count:instances',
      (_: IpcRendererEvent, arg: { total: number }) => {
        setTotalInstances(arg.total);
      }
    );
  }, []);
  return (
    <Background>
      <SpaceAround>
        <>
          <WelcomeToDevonfw></WelcomeToDevonfw>
          <Grid container spacing={3}>
            <ViewDashboardProjectsDetail
              title="PROJECT CREATED"
              total={totalInstances}
            />
          </Grid>
        </>
      </SpaceAround>
    </Background>
  );
}
