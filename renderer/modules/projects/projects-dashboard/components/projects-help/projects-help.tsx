import Typography from '@material-ui/core/Typography';

export default function ProjectsHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Projects
      </Typography>

      <Typography>Here are your devonfw projects. You can:</Typography>
      <ul>
        <Typography component="li">Open a project</Typography>
        <Typography component="li">Delete a project</Typography>
        <Typography component="li">or create a new one</Typography>
      </ul>
    </>
  );
}
