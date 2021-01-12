import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useState, useEffect, useContext } from 'react';
import { useProfilePictureStyles } from './profile-picture.styles';
import { ProfileData } from '../../../../models/dashboard/profile-data';
import { StepperContext } from '../../../projects/redux/stepper/stepperContext';

export default function ProfilePicture(): JSX.Element {
  const classes = useProfilePictureStyles();
  const { state, dispatch } = useContext(StepperContext);

  const [profile, setProfile] = useState<ProfileData>({
    name: 'Unknown User',
    image: '/static/assets/user.png',
    gender: 'male',
    role: 'Undefined Role',
  });

  useEffect(() => {
    if (!state.userProfile.name && !state.userProfile.role) {
      loadProfile();
    }
    return () => {
      global.ipcRenderer.removeAllListeners('find:profile');
    };
  }, []);

  useEffect(() => {
    setProfile(state.userProfile);
  }, [state.userProfile]);

  const loadProfile = (): void => {
    global.ipcRenderer.invoke('find:profile').then((profile: ProfileData) => {
      dispatch({
        type: 'USER_PROFILE',
        payload: {
          userProfile: profile,
        },
      });
    });
  };

  return (
    <div className={classes.customDrawerContainer}>
      <Card className={classes.customDrawerRoot}>
        <CardMedia
          className={classes.customDrawerCover}
          image={profile.image ? profile.image : '#'}
          title="User"
        />
        <div>
          <CardContent className={classes.customDrawerContent}>
            <Typography component="h6" variant="h6">
              <div className={classes.user}>
                <span className={classes.name}>{profile.name}</span>
                <span className={classes.role}>{profile.role}</span>
              </div>
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
