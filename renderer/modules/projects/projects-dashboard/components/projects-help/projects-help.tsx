import Typography from '@material-ui/core/Typography';
import useHelpStyles from '../../../../shared/components/help/help.styles';

export default function ProjectsHelp(): JSX.Element {
  const classes = useHelpStyles();

  return (
    <>
      <Typography variant="h6" component="h2" className={classes.title}>
        Projects
      </Typography>

      <Typography>Here are your devonfw projects. You can:</Typography>
      <ul className={classes.title}>
        <Typography component="li">Open a project</Typography>
        <Typography component="li">Delete a project</Typography>
        <Typography component="li">or create a new one</Typography>
      </ul>
    </>
  );
}
