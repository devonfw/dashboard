import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { StepperContext } from '../../modules/projects/redux/stepper/stepperContext';
import {
  ProjectDetails,
  SearchForm,
} from '../../modules/projects/redux/stepper/data.model';
import Layout from '../../modules/shared/hoc/Layout';
import SpaceAround from '../../modules/shared/hoc/SpaceAround';
import DashboardProjects from '../../modules/projects/projects-dashboard/components/dashboard-project-details/DashboardProjects';
import ProjectsPagination, {
  PAGINATION_MIN_ROWS,
} from '../../modules/projects/projects-dashboard/components/pagination/pagination';
import { ProjectFilterBuilder } from '../../modules/projects/projects-dashboard/components/dashboard-filter/project-filter-builder';
import Paginator from '../../modules/shared/classes/paginator';
import Box from '@material-ui/core/Box';

export default function Projects(): JSX.Element {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [allProjects, setAllProjects] = useState<ProjectDetails[]>([]);
  const [page, setPage] = useState<ProjectDetails[]>([]);
  const [paginator] = useState(
    new Paginator<ProjectDetails>([], PAGINATION_MIN_ROWS)
  );
  const { state } = useContext(StepperContext);

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
    _: unknown,
    data: { projects: ProjectDetails[] }
  ) => {
    filterProjects({ searchValue: '', filterValue: '' }, data.projects);
    setAllProjects(data.projects);
    setProjects(data.projects);
    paginator.setItems(data.projects);
    setPage(paginator.getItemsInPage());
  };

  const filterProjects = (
    searchForm: SearchForm,
    projects: ProjectDetails[]
  ): void => {
    const filtered = new ProjectFilterBuilder(projects).applyFilter(searchForm);
    setProjects(filtered);
    paginator.setItems(filtered);
    setPage(paginator.getItemsInPage());
  };

  const handleItemsPerPageChange = (nItems: number): void => {
    paginator.setItemsPerPage(nItems);
  };

  const handlePageChange = (page: number): void => {
    paginator.changePage(page);
    setPage(paginator.getItemsInPage());
  };

  return (
    <Layout>
      <SpaceAround bgColor={'#F4F6F8'}>
        <DashboardProjects
          allProjects={allProjects}
          projects={page}
          setProject={filterProjects}
          setAllProject={setAllProjects}
          dirPath={state.projectData.path}
          projectsCount={projects.length}
        />
        <Box mt="auto">
          <ProjectsPagination
            count={projects.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleItemsPerPageChange}
          />
        </Box>
      </SpaceAround>
    </Layout>
  );
}
