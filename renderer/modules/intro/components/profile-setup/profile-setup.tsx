import { useRouter } from 'next/router';
import { IpcRendererEvent } from 'electron';
import { ProfileData } from '../../../../models/dashboard/profile-data';
import { useState, useEffect, ChangeEvent } from 'react';

import Button from '@material-ui/core/Button';
import useStyles from './profile-setup.style';
import FormControlName from './form-control-name/form-control-name';
import FormControlRole from './form-control-role/form-control-role';
import FormControlImage from './form-control-image/form-control-image';
import FormControlGender from './form-control-gender/form-control-gender';

interface ProfileSetupProps {
  settingsPage?: boolean;
}

export default function ProfileSetup(props: ProfileSetupProps): JSX.Element {
  const classes = useStyles();
  const router = useRouter();
  const [data, setData] = useState<ProfileData>({
    name: '',
    image: '',
    gender: '',
    role: '',
  });
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (props.settingsPage) loadProfile();

    global.ipcRenderer.on(
      'get:base64Img',
      (_: IpcRendererEvent, value: string) => {
        setData((prevSate: ProfileData) => {
          const newState: ProfileData = { ...prevSate, image: value };
          return newState;
        });
        if (props.settingsPage) setButtonsDisabled(false);
      }
    );

    global.ipcRenderer.on(
      'get:profileCreationStatus',
      (_: IpcRendererEvent, status: string) => {
        if (status === 'success') {
          if (props.settingsPage) loadProfile();
          else navigateToHome();
        }
      }
    );

    return () => {
      global.ipcRenderer.removeAllListeners('find:profile');
      global.ipcRenderer.removeAllListeners('get:base64Img');
      global.ipcRenderer.removeAllListeners('get:profileCreationStatus');
    };
  }, []);

  const loadProfile = () => {
    global.ipcRenderer.invoke('find:profile').then((profile: ProfileData) => {
      const sanitizedData = sanitizeData(profile);
      setData(sanitizedData);
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputname: string = event.target.name;
    const value = event.target.value;
    setData((prevSate: ProfileData) => {
      return { ...prevSate, [inputname]: value };
    });
    setButtonsDisabled(false);
  };

  const handleRadioImageClick = (value: string) => {
    setData((prevSate: ProfileData) => {
      return {
        ...prevSate,
        gender: value,
      };
    });
    setButtonsDisabled(false);
  };

  const formEmpty = (): boolean => {
    return (
      data.name === '' &&
      data.image === '' &&
      data.gender === '' &&
      data.role === ''
    );
  };

  const createProfile = () => {
    if (formEmpty()) {
      navigateToHome();
    } else {
      global.ipcRenderer.send('set:profile', data);
    }
    setButtonsDisabled(true);
  };

  const onCancel = () => {
    loadProfile();
    setButtonsDisabled(true);
  };

  const navigateToHome = () => {
    router.push('/home');
  };

  const sanitizeData = (profile: ProfileData): ProfileData => {
    const sanitizedData: ProfileData = {
      name: profile.name === 'Unknown User' ? '' : profile.name,
      role: profile.role === 'Undefined Role' ? '' : profile.role,
      gender: profile.gender,
      image: profile.image,
    };
    return sanitizedData;
  };

  return (
    <div className={props.settingsPage ? classes.rootSettings : classes.root}>
      <form noValidate autoComplete="off">
        <FormControlName
          value={data.name}
          changeHandler={handleChange}
        ></FormControlName>
        <FormControlImage value={data.image}></FormControlImage>
        <FormControlGender
          value={data.gender}
          changeHandler={handleChange}
          imageClickHandler={handleRadioImageClick}
        ></FormControlGender>
        <FormControlRole
          value={data.role}
          changeHandler={handleChange}
        ></FormControlRole>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={props.settingsPage ? buttonsDisabled : false}
          onClick={createProfile}
        >
          {props.settingsPage ? 'Save' : 'Create My Profile'}
        </Button>
        {props.settingsPage ? (
          <Button
            variant="outlined"
            disabled={buttonsDisabled}
            onClick={onCancel}
          >
            Cancel
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => router.push('/home')}>
            Will Do It Later
          </Button>
        )}
      </form>
    </div>
  );
}
