import Typography from '@material-ui/core/Typography';
import useHelpStyles from '../../../../shared/components/help/help.styles';

export default function AccountHelp(): JSX.Element {
  const classes = useHelpStyles();

  return (
    <>
      <Typography variant="h6" component="h2" className={classes.title}>
        Account
      </Typography>
      <Typography>Update your profile</Typography>
    </>
  );
}
