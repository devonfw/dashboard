import { useState, useEffect, useContext } from 'react';
import Layout from '../../modules/shared/hoc/Layout';
import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import DashboardProjects from '../../modules/projects/projects-dashboard/components/dashboard-projects/DashboardProjects';
import { IpcRendererEvent } from 'electron';
import { ProjectDetails } from '../../modules/projects/redux/stepper/data.model';
import { useRouter } from 'next/router';
import { StepperContext } from '../../modules/projects/redux/stepper/stepperContext';

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const { state } = useContext(StepperContext);
  const router = useRouter();

  useEffect(() => {
    if (state.creatingProject) {
      router.push('/projects/creation');
      return;
    }
    global.ipcRenderer.on('ide:projects', ideProjectsHandler);
    return () => {
      global.ipcRenderer.removeAllListeners('ide:projects');
    };
  }, []);

  useEffect(() => {
    if (state.projectData.path) {
      global.ipcRenderer.send('ide:projects', state.projectData.path);
    }
  }, [state]);

  const ideProjectsHandler = (
    _: IpcRendererEvent,
    data: { message: string; projects: ProjectDetails[] }
  ) => {
    setProject(data.projects);
  };

  const setProject = (projects: ProjectDetails[]): void => {
    setProjects(projects);
  };

  return (
    <Layout>
      <SpaceAround bgColor={'#F4F6F8'}>
        <DashboardProjects
          projects={projects}
          setProject={setProject}
          dirPath={state.projectData.path}
        />
      </SpaceAround>
    </Layout>
  );
}
