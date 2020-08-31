import Typography from '@material-ui/core/Typography';

export default function RepositoriesHelp(): JSX.Element {
  return (
    <>
      <Typography>Check the projects under devonfw organization.</Typography>
      <ul>
        <Typography component="li">Open a project in your browser</Typography>
        <Typography component="li">
          Copy its link so you can clone it
        </Typography>
      </ul>
    </>
  );
}
