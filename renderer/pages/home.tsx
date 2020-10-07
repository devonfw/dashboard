import { useEffect, useState, useContext } from 'react';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import ViewDashboardProjectsDetail from '../modules/home/components/view-dashboard-projects-detail/ViewDashboardProjectsDetail';
import Background from '../modules/home/components/background/background';
import WelcomeToDevonfw from '../modules/home/components/welcome-to-devonfw/welcome-to-devonfw';
import { StepperContext } from '../modules/projects/redux/stepper/stepperContext';

export default function Home(): JSX.Element {
  const { state, dispatch } = useContext(StepperContext);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    global.ipcRenderer
      .invoke('count:projetcs')
      .then((count) => setTotalProjects(count));

    if (!state.projectData.path) {
      dispatch({ type: 'ACCESSIBILITY' });
    }
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
