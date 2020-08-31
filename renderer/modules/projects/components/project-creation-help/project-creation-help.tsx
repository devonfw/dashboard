import Typography from '@material-ui/core/Typography';
import useHelpStyles from '../../../shared/components/help/help.styles';

export default function ProjectCreationHelp(): JSX.Element {
  const classes = useHelpStyles();

  return (
    <>
      <Typography variant="h6" component="h2" className={classes.title}>
        Project creation
      </Typography>

      <Typography>To create a project:</Typography>
      <ol className={classes.list}>
        <Typography component="li">Choose a technology stack</Typography>
        <Typography component="li">Fill basic project data</Typography>
        <Typography component="li">Run the creation</Typography>
      </ol>
    </>
  );
}
