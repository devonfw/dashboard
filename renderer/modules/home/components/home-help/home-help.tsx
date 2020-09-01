import Typography from '@material-ui/core/Typography';
import useHelpStyles from '../../../shared/components/help/help.styles';

export default function HomeHelp(): JSX.Element {
  const classes = useHelpStyles();

  return (
    <>
      <Typography variant="h6" component="h2" className={classes.title}>
        Welcome to devonfw dashboard
      </Typography>

      <Typography>To create projects you need a devonfw version.</Typography>
      <ul className={classes.list}>
        <Typography component="li">
          Click on <strong>Download latest version</strong>
        </Typography>
      </ul>
    </>
  );
}
