import NextLink from '../responsive-drawer/navigation/nextjs-link/NextLink';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { ProjectDetails } from '../Stepper/redux/data.model';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
      textDecoration: 'none',
    },
    '& .MuiButton-root:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiTypography-h6': {
      fontSize: '14px',
    },
  },
  newProject: {
    width: '211px',
    height: '159px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#495057',
    padding: '0 3em 3em 0',
    '& h3': {
      margin: 0,
    },
    '& .search': {
      width: '250px',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
  link: {
    textDecoration: 'none',
  },
  ProjectGrid: {
    position: 'relative',
    marginBottom: '2em',
    '& .MuiCardContent-root': {
      position: 'absolute',
      top: '90px'
    }
  },
  alignCenter: {
    textAlign: 'center',
    marginTop: '1em',
    marginLeft: '2em'
  }
});


export default function DashboardProjects(props: {
  projects: ProjectDetails[];
}): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.header}>
        <h2>{ `${props.projects.length} Projects` }</h2>
        <div className="search">
          <TextField id="outlined-basic" label="Search" variant="outlined" />
        </div>
      </Grid>
      <Grid item xs={3}>
        <NextLink href="/start" className={classes.link}>
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
      {props.projects && props.projects.length ? props.projects.map((project: ProjectDetails, index: number) => (
        <Grid item xs={3} key={index} className={classes.ProjectGrid}>
          <Card>
            <CardMedia
              className={classes.newProject}
              image={`/assets/${project.domain}.png`}
              title={project.domain}
            />
            <CardContent>
              <Typography component="h6" variant="h6">
                <div style={{color: '#FFFFFF'}}>{project.name}</div>
                <div style={{color: '#4CBDEC'}}>{`Last Updated ${project.date}`}</div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )) : null
    }
    </div>
  );
}
