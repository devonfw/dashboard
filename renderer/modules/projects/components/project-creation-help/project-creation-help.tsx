import Typography from '@material-ui/core/Typography';

export default function ProjectCreationHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Project creation
      </Typography>

      <Typography>To create a project:</Typography>
      <ol>
        <Typography component="li">Choose a technology stack</Typography>
        <Typography component="li">Fill basic project data</Typography>
        <Typography component="li">Run the creation</Typography>
      </ol>
    </>
  );
}
