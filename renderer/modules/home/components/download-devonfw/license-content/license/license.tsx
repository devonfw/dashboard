import useLicenseStyles from './license.styles';
import Typography from '@material-ui/core/Typography';
import { LICENSE } from './license-file';

export default function License(): JSX.Element {
  const classes = useLicenseStyles();

  return (
    <>
      <Typography component="h1" variant="h6">
        READ AND AGREE THE END USER AGREEMENT
      </Typography>
      <Typography component="pre" className={classes.license}>
        {LICENSE}
      </Typography>
    </>
  );
}
