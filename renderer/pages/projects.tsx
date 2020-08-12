import { useState, useEffect, useContext } from 'react';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import DashboardProjects from '../components/dashboard-projects/DashboardProjects';
import { IpcRendererEvent } from 'electron';
import { ProjectDetails } from '../modules/projects/redux/stepper/data.model';
import { useRouter } from 'next/router';
import { StepperContext } from '../modules/projects/redux/stepper/stepperContext';

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const { state } = useContext(StepperContext);
  const router = useRouter();

  useEffect(() => {
    if (state.creatingProject) {
      router.push('/start');
      return;
    }

    global.ipcRenderer.send('find:projectDetails');
    global.ipcRenderer.on(
      'get:projectDetails',
      (_: IpcRendererEvent, projects: ProjectDetails[]) => {
        setProjects(projects);
      }
    );

    return () => {
      global.ipcRenderer.removeAllListeners('find:projectDetails');
      global.ipcRenderer.removeAllListeners('get:projectDetails');
    };
  }, []);

  return (
    <Layout>
      <SpaceAround bgColor={'#F4F6F8'}>
        <DashboardProjects projects={projects} />
      </SpaceAround>
    </Layout>
  );
}
