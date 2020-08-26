import {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  MutableRefObject,
  useContext,
} from 'react';
import { IpcRendererEvent } from 'electron';
import NextLink from '../../../modules/shared/components/nextjs-link/NextLink';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDashboardProjectsStyles } from './dashboard-projects.styles';
import {
  ProjectDetails,
  ProjectDeleteUpdates,
  SearchForm,
} from '../../../modules/projects/redux/stepper/data.model';
import Alerts from '../../../modules/shared/components/alerts/alerts';
import { AlertType } from '../../../models/alert/alert.model';
import Renderer from '../../../modules/shared/services/renderer/renderer.service';
import { ProcessState } from '../../../models/dashboard/ProcessState';
import { ProjectMenuType } from '../../../models/dashboard/ProjectMenuType';
import ProjectDetail from './project-detail';
import MenuList from '../menu-list/menu-list';
import { DashboardSearch } from '../dashboard-search/dashboard-search';
import { StepperContext } from '../../../modules/projects/redux/stepper/stepperContext';

interface DashboardProjectsProps {
  projects: ProjectDetails[];
  allProjects: ProjectDetails[];
  setProject: (searchForm: SearchForm, projects: ProjectDetails[]) => void;
  setAllProject: (project: ProjectDetails[]) => void;
  dirPath: string;
}

export default function DashboardProjects(
  props: DashboardProjectsProps
): JSX.Element {
  // const { state } = useContext(StepperContext);
  const renderer = new Renderer();
  const classes = useDashboardProjectsStyles({});
  const initialState = {
    mouseX: null,
    mouseY: null,
    project: { name: '', domain: '', date: '', path: '' },
  };
  const initialAlertState = {
    alertSeverity: '',
    message: '',
    operation: false,
  };
  const initialSearchForm = {
    searchValue: '',
    filterValue: 'name',
  };
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ProjectMenuType>(initialState);
  const [alertMessage, setAlertMessage] = useState<AlertType>(
    initialAlertState
  );
  const searchElement = useRef<HTMLInputElement>() as MutableRefObject<
    HTMLInputElement
  >;
  const filterElement = useRef<HTMLInputElement>() as MutableRefObject<
    HTMLInputElement
  >;

  const closeAlert = () => {
    setAlertMessage((prevState: AlertType) => {
      return {
        ...prevState,
        operation: false,
      };
    });
  };

  const [searchFormState, setSearchFormState] = useState<SearchForm>(
    initialSearchForm
  );

  useEffect(() => {
    renderer.on('open:projectInIde', ideHandler);
    renderer.on('delete:project', deleteHandler);
    return () => {
      renderer.removeAll();
    };
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    project: ProjectDetails
  ) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      project: project,
    });
  };

  const ideHandler = (
    _: IpcRendererEvent,
    data: { data: ProcessState; message: string }
  ) => {
    setOpen(false);
    if (data.message !== 'success') {
      setAlertMessage({
        alertSeverity: 'error',
        message: data.message,
        operation: true,
      });
    }
  };

  const deleteHandler = (_: IpcRendererEvent, data: ProjectDeleteUpdates) => {
    setOpen(false);
    if (data.message === 'success') {
      props.setProject(getFilteredValue(), data.projects);
      props.setAllProject(data.projects);
      setAlertMessage({
        alertSeverity: 'success',
        message: 'Successfully deleted project',
        operation: true,
      });
    } else {
      setAlertMessage({
        alertSeverity: 'error',
        message:
          'Failed to delete project due to technical issue / network issue',
        operation: true,
      });
    }
  };

  const handleClose = () => {
    setState(initialState);
  };

  const openProjectInIde = (ide: string) => {
    setOpen(true);
    global.ipcRenderer.send('open:projectInIde', {
      project: state.project,
      ide: ide,
    });
    setState(initialState);
  };

  const deleteProject = () => {
    setOpen(true);
    global.ipcRenderer.send('delete:project', {
      project: state.project,
      dirPath: props.dirPath,
    });
    setState(initialState);
  };

  const openProjectDirectory = () => {
    global.ipcRenderer.send('open:projectDirectory', state.project.path);
  };

  const searchHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.id === 'search') {
      props.setProject(getFilteredValue(), props.allProjects);
    } else {
      filterElement.current.value = event.target.value;
      props.setProject(getFilteredValue(), props.allProjects);
    }
  };

  const getFilteredValue = (): SearchForm => {
    return {
      searchValue: searchElement.current?.value,
      filterValue: filterElement.current.value,
    };
  };

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <DashboardSearch
          searchRef={searchElement}
          filterRef={filterElement}
          value={searchFormState}
          searchHandler={searchHandler}
          projects={props.projects}
        />
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <NextLink href="/project-creation" className={classes.link}>
          <Card className={classes.ProjectGrid}>
            <CardMedia
              className={classes.newProject}
              image="/assets/add_new_project.png"
              title="Add new Project"
            />
            <CardContent className={classes.alignCenter}>
              <Typography component="h6" variant="h6">
                Add New Project
              </Typography>
            </CardContent>
          </Card>
        </NextLink>
      </Grid>
      {props.projects && props.projects.length
        ? props.projects.map((project: ProjectDetails, index: number) => {
            return (
              <Grid
                item
                xs={6}
                md={4}
                lg={3}
                key={index}
                className={classes.ProjectGrid}
              >
                <Card>
                  <ProjectDetail project={project} handleClick={handleClick} />
                </Card>
              </Grid>
            );
          })
        : null}
      <MenuList
        project={state.project}
        state={state}
        handleClose={handleClose}
        openProjectInIde={openProjectInIde}
        openProjectDirectory={openProjectDirectory}
        deleteProject={deleteProject}
      />
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Alerts
        close={closeAlert}
        alertSeverity={alertMessage.alertSeverity}
        message={alertMessage.message}
        operation={alertMessage.operation}
      />
    </div>
  );
}
