import Typography from '@material-ui/core/Typography';
import useHelpStyles from '../../../shared/components/help/help.styles';

export default function RepositoriesHelp(): JSX.Element {
  const classes = useHelpStyles();

  return (
    <>
      <Typography>Check the projects under devonfw organization.</Typography>
      <ul className={classes.list}>
        <Typography component="li">Open a project in your browser</Typography>
        <Typography component="li">
          Copy its link so you can clone it
        </Typography>
      </ul>
    </>
  );
}
