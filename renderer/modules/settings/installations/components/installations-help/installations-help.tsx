import Typography from '@material-ui/core/Typography';
import useHelpStyles from '../../../../shared/components/help/help.styles';

export default function InstallationsHelp(): JSX.Element {
  const classes = useHelpStyles();

  return (
    <>
      <Typography variant="h6" component="h2" className={classes.title}>
        Installed versions
      </Typography>
      <Typography>Configure your installed devonfw-ide versions</Typography>
      <ul className={classes.list}>
        <Typography component="li">
          Upgrade the software included in a specific version
        </Typography>
        <Typography component="li">Uninstall a version</Typography>
      </ul>
    </>
  );
}
