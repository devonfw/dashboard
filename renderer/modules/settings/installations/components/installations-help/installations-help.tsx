import Typography from '@material-ui/core/Typography';

export default function InstallationsHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Installed versions
      </Typography>
      <Typography>Configure your installed devonfw-ide versions</Typography>
      <ul>
        <Typography component="li">
          Upgrade the software included in a specific version
        </Typography>
        <Typography component="li">Uninstall a version</Typography>
      </ul>
    </>
  );
}
