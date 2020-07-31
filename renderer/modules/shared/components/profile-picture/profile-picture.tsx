import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useProfilePictureStyles } from './profile-picture.styles';

export default function ProfilePicture(): JSX.Element {
  const classes: { [key: string]: string } = useProfilePictureStyles();

  return (
    <div className={classes.customDrawerContainer}>
      <Card className={classes.customDrawerRoot}>
        <CardMedia
          className={classes.customDrawerCover}
          image="/assets/photo.png"
          title="User"
        />
        <div>
          <CardContent className={classes.customDrawerContent}>
            <Typography component="h6" variant="h6">
              <div className={classes.user}>
                <span style={{ fontWeight: 'bold', color: '#0075B3' }}>
                  Watson
                </span>
                <span>Senior Architect</span>
              </div>
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
