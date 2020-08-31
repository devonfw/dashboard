import { useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import NextLink from '../../../../shared/components/nextjs-link/NextLink';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDashboardProjectsStyles } from './dashboard-projects.styles';
import {
  ProjectDetails,
  ProjectDeleteUpdates,
} from '../../../redux/stepper/data.model';
import Alerts from '../../../../shared/components/alerts/alerts';
import { AlertType } from '../../../../../models/alert/alert.model';
import Renderer from '../../../../shared/services/renderer/renderer.service';
import { ProcessState } from '../../../../../models/dashboard/ProcessState';
import { ProjectMenuType } from '../../../../../models/dashboard/ProjectMenuType';
import ProjectDetail from './project-detail';
import MenuList from './menu-list';
import TitleCounter from '../../../../shared/components/title-counter/title-counter';

interface DashboardProjectsProps {
  projects: ProjectDetails[];
  setProject: (project: ProjectDetails[]) => void;
  dirPath: string;
}

export default function DashboardProjects(
  props: DashboardProjectsProps
): JSX.Element {
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
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ProjectMenuType>(initialState);

  const closeAlert = () => {
    setAlertMessage((prevState: AlertType) => {
      return {
        ...prevState,
        operation: false,
      };
    });
  };

  const [alertMessage, setAlertMessage] = useState<AlertType>(
    initialAlertState
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
      props.setProject(data.projects);
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

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <TitleCounter count={props.projects.length}> Projects</TitleCounter>
        <div className="search">
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </div>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <NextLink href="/projects/creation" className={classes.link}>
          <Card className={classes.ProjectGrid}>
            <CardMedia
              className={classes.newProject}
              image="/static/assets/add_new_project.png"
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
