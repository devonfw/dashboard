import Typography from '@material-ui/core/Typography';

export default function HomeHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Welcome to devonfw dashboard
      </Typography>

      <Typography>To create projects you need a devonfw version.</Typography>
      <ul>
        <Typography component="li">
          Click on <strong>Download latest version</strong>
        </Typography>
      </ul>
    </>
  );
}
