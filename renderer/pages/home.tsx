import { useEffect, useState } from 'react';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import ViewDashboardProjectsDetail from '../modules/home/components/view-dashboard-projects-detail/ViewDashboardProjectsDetail';
import Background from '../modules/home/components/background/background';
import WelcomeToDevonfw from '../modules/home/components/welcome-to-devonfw/welcome-to-devonfw';

export default function Home(): JSX.Element {
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    global.ipcRenderer
      .invoke('count:projetcs')
      .then((count) => setTotalProjects(count));
  }, []);
  return (
    <Background>
      <SpaceAround>
        <>
          <WelcomeToDevonfw></WelcomeToDevonfw>
          <div style={{ marginTop: 40 }}>
            <ViewDashboardProjectsDetail
              title="PROJECT CREATED"
              total={totalProjects}
            />
          </div>
        </>
      </SpaceAround>
    </Background>
  );
}
