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
  accept?: string;
  cancel?: string;
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

  useEffect(() => {
    global.ipcRenderer.on(
      'get:base64Img',
      (_: IpcRendererEvent, value: string) => {
        setData((prevSate: ProfileData) => {
          const newState: ProfileData = { ...prevSate, image: value };
          return newState;
        });
      }
    );
    global.ipcRenderer.on(
      'get:profileCreationStatus',
      (_: IpcRendererEvent, status: string) => {
        if (status === 'success') {
          router.push('/home');
        }
      }
    );
    return () => {
      global.ipcRenderer.removeAllListeners('get:base64Img');
      global.ipcRenderer.removeAllListeners('get:profileCreationStatus');
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputname: string = event.target.name;
    const value = event.target.value;
    setData((prevSate: ProfileData) => {
      return { ...prevSate, [inputname]: value };
    });
    checkFormValidity();
  };

  const handleRadioImageClick = (value: string) => {
    setData((prevSate: ProfileData) => {
      return {
        ...prevSate,
        gender: value,
      };
    });
    checkFormValidity();
  };

  const checkFormValidity = (): boolean => {
    return (
      data.name === '' ||
      data.image === '' ||
      data.gender === '' ||
      data.role === ''
    );
  };

  const createProfile = () => {
    global.ipcRenderer.send('set:profile', JSON.stringify(data));
  };

  return (
    <div className={classes.root}>
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
          disabled={checkFormValidity()}
          onClick={createProfile}
        >
          {props.accept ? props.accept : 'Create My Profile'}
        </Button>
        <Button variant="outlined" onClick={() => router.push('/home')}>
          {props.cancel ? props.cancel : 'Will Do It Later'}
        </Button>
      </form>
    </div>
  );
}
