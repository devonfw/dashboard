import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useDashboardProjectsStyles } from './dashboard-projects.styles';
import { ProjectDetails } from '../../../modules/projects/redux/stepper/data.model';

interface ProjectDetailProps {
  project: ProjectDetails;
  handleClick: (
    event: React.MouseEvent<HTMLDivElement>,
    project: ProjectDetails
  ) => void;
}

export default function ProjectDetail(props: ProjectDetailProps): JSX.Element {
  const classes = useDashboardProjectsStyles();
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
          <div className={classes.name}>{props.project.name}</div>
          <div
            className={classes.updateDate}
          >{`Last Updated ${props.project.date}`}</div>
        </Typography>
      </CardContent>
    </div>
  );
}
