import { useState, useEffect } from 'react';
import { IpcRendererEvent } from 'electron';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { useProfilePictureStyles } from './profile-picture.styles';
import { ProfileData } from '../../../../models/dashboard/profile-data';

export default function ProfilePicture(): JSX.Element {
  const classes: { [key: string]: string } = useProfilePictureStyles();

  const [data, setData] = useState<ProfileData>({
    name: 'Unknown User',
    image: '/assets/user.png',
    gender: 'male',
    role: 'Undefined Role',
  });

  useEffect(() => {
    global.ipcRenderer.send('find:profile');

    global.ipcRenderer.on(
      'get:profile',
      (_: IpcRendererEvent, data: ProfileData) => {
        if (data.name !== '') setData(data);
      }
    );
    return () => {
      global.ipcRenderer.removeAllListeners('get:profile');
    };
  }, []);

  return (
    <div className={classes.customDrawerContainer}>
      <Card className={classes.customDrawerRoot}>
        <CardMedia
          className={classes.customDrawerCover}
          image={data.image}
          title="User"
        />
        <div>
          <CardContent className={classes.customDrawerContent}>
            <Typography component="h6" variant="h6">
              <div className={classes.user}>
                <span style={{ fontWeight: 'bold', color: '#0075B3' }}>
                  {data.name}
                </span>
                <span className={classes.role}>{data.role}</span>
              </div>
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
