import { useState, useEffect, useContext, ChangeEvent } from 'react';
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
import { DashboardSearch } from '../components/dashboard-projects/dashboard-search/dashboard-search';
import { applyFilter } from '../components/dashboard-projects/dashboard-filter/projects-filter';

export default function Projects(): JSX.Element {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const { state } = useContext(StepperContext);
  const router = useRouter();
  // this state is required for the search operation in DashboardProjects component
  const [allProjects, setAllProjects] = useState<ProjectDetails[]>([]);
  const initialSearchForm = {
    searchValue: '',
    filterValue: 'name',
  };
  const [searchFormState, setSearchFormState] = useState<SearchForm>(
    initialSearchForm
  );

  useEffect(() => {
    if (state.creatingProject) {
      router.push('/start');
      return;
    }
    global.ipcRenderer.on('ide:projects', ideProjectsHandler);
    return () => {
      global.ipcRenderer.removeAllListeners('ide:projects');
    };
  }, []);

  useEffect(() => {
    if (state.projectData.path) {
      setSearchFormState(initialSearchForm);
      global.ipcRenderer.send('ide:projects', state.projectData.path);
    }
  }, [state]);

  useEffect(() => {
    applySearchFilter();
  }, [searchFormState]);

  const ideProjectsHandler = (
    _: IpcRendererEvent,
    data: { message: string; projects: ProjectDetails[] }
  ) => {
    setProjectInFilterMode(data.projects);
    setAllProjects(data.projects);
  };

  /* Below functions are needed for the updating Project state after 
    deleting a Project from the Dashboard component 
  */
  const setAllProject = (projects: ProjectDetails[]): void => {
    setAllProjects(projects);
  };

  const setProjectInFilterMode = (projects: ProjectDetails[]): void => {
    console.log('calling...');
    setProjects(applyFilter(searchFormState, projects));
  };

  // This method will call when search or filter state changed
  const applySearchFilter = (): void => {
    if (allProjects.length) {
      setProjects(applyFilter(searchFormState, allProjects));
    }
  };

  const searchHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    if (event.target.id === 'search') {
      setSearchFormState({
        ...searchFormState,
        searchValue: event.target.value,
      });
    } else {
      setSearchFormState({
        ...searchFormState,
        filterValue: event.target.value,
      });
    }
  };

  return (
    <Layout>
      <SpaceAround bgColor={'#F4F6F8'}>
        <form>
          <DashboardSearch
            value={searchFormState}
            searchHandler={searchHandler}
            projects={projects}
          />
          <DashboardProjects
            allProjects={allProjects}
            projects={projects}
            setProject={setProjectInFilterMode}
            setAllProject={setAllProject}
            dirPath={state.projectData.path}
          />
        </form>
      </SpaceAround>
    </Layout>
  );
}
