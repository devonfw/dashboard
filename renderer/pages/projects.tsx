import { useState, useEffect, useContext } from 'react';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import DashboardProjects from '../components/dashboard-projects/dashboard-project-details/DashboardProjects';
import { IpcRendererEvent } from 'electron';
import {
  ProjectDetails,
  SearchForm,
} from '../modules/projects/redux/stepper/data.model';
import { useRouter } from 'next/router';
import { StepperContext } from '../modules/projects/redux/stepper/stepperContext';
import { ProjectsFilter } from '../components/dashboard-projects/dashboard-filter/projects-filter';

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const { state } = useContext(StepperContext);
  const router = useRouter();
  // this state is required for the search operation in DashboardProjects component
  const [allProjects, setAllProjects] = useState<ProjectDetails[]>([]);
  useEffect(() => {
    if (state.creatingProject) {
      router.push('/project-creation');
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
    setProjectInFilterMode(
      {
        searchValue: '',
        filterValue: '',
      },
      data.projects
    );
    setAllProjects(data.projects);
  };

  /* Below functions are needed for the updating Project state after 
    deleting a Project from the Dashboard component 
  */
  const setAllProject = (projects: ProjectDetails[]): void => {
    setAllProjects(projects);
  };

  const setProjectInFilterMode = (
    searchForm: SearchForm,
    projects: ProjectDetails[]
  ): void => {
    setProjects(new ProjectsFilter(projects).applyFilter(searchForm));
  };

  return (
    <Layout>
      <SpaceAround bgColor={'#F4F6F8'}>
        <DashboardProjects
          allProjects={allProjects}
          projects={projects}
          setProject={setProjectInFilterMode}
          setAllProject={setAllProject}
          dirPath={state.projectData.path}
        />
      </SpaceAround>
    </Layout>
  );
}
