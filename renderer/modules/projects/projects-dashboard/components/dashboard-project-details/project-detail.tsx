import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { useDashboardProjectsStyles } from './dashboard-projects.styles';
import { ProjectDetails } from '../../../redux/stepper/data.model';

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
    <Card
      onContextMenu={(event) => props.handleClick(event, props.project)}
      style={{ cursor: 'pointer' }}
    >
      <CardMedia
        className={classes.cardMedia}
        image={`/static/assets/${props.project.domain}.png`}
        title={props.project.domain}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="span">
          <Box fontWeight="fontWeightBold" fontSize={14}>
            {props.project.workspace}/{props.project.name}
          </Box>
        </Typography>
        <Typography component="span">
          <Box fontWeight="fontWeightLight" fontSize={14}>
            Last Updated {props.project.date}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}
