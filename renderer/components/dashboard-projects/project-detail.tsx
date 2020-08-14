import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDashboardProjectsStyles } from './dashboard-projects.styles';
import { ProjectDetails } from '../../modules/projects/redux/stepper/data.model';
import { ProjectMenuType } from '../../models/dashboard/ProjectMenuType';
import MenuList from './menu-list';

export default function ProjectDetail(props: {
  project: ProjectDetails;
  handleClose: () => void;
  openProjectInIde: () => void;
  openProjectDirectory: () => void;
  deleteProject: () => void;
  state: ProjectMenuType;
  handleClick: (
    event: React.MouseEvent<HTMLDivElement>,
    project: ProjectDetails
  ) => void;
}): JSX.Element {
  const classes = useDashboardProjectsStyles({});
  return (
    <div
      onContextMenu={(event) => props.handleClick(event, props.project)}
      style={{ cursor: 'pointer' }}
    >
      <CardMedia
        className={classes.newProject}
        image={`/assets/${props.project.domain}.png`}
        title={props.project.domain}
      />
      <CardContent>
        <Typography component="h6" variant="h6">
          <div style={{ color: '#FFFFFF' }}>{props.project.name}</div>
          <div
            style={{ color: '#4CBDEC' }}
          >{`Last Updated ${props.project.date}`}</div>
        </Typography>
        <MenuList
          state={props.state}
          handleClose={props.handleClose}
          openProjectInIde={props.openProjectInIde}
          openProjectDirectory={props.openProjectDirectory}
          deleteProject={props.deleteProject}
        />
      </CardContent>
    </div>
  );
}
