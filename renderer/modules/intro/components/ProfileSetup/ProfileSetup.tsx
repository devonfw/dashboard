import { useState, useEffect, ChangeEvent } from 'react';
import { IpcRendererEvent } from 'electron';
import router from 'next/router';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import useStyles from './ProfileSetup.style';
import { ProfileData } from '../../../../models/dashboard/ProfileData';
import MessageSenderService from '../../../shared/services/renderer/messageSender.service';

const WhiteTextField = withStyles({
  root: {
    '& label': {
      backgroundColor: '#FFFFFF',
    },
    '& label.MuiFormLabel-filled': {
      padding: '0.2em 0.5em',
      borderRadius: '4px',
    },
    '& label.Mui-focused': {
      padding: '0.2em 0.5em',
      borderRadius: '4px',
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#FFFFFF',
    },
  },
})(TextField);

export default function ProfileSetup(): JSX.Element {
  const classes = useStyles();
  const messageSender: MessageSenderService = new MessageSenderService();
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
      // return newState;
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

  const handleOpenDialog = async () => {
    const message = await messageSender.sendOpenDialog(
      ['openFile'],
      [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'bmp'] }]
    );
    if (!message.canceled) {
      const dirPath = message.filePaths[0];
      global.ipcRenderer.send('set:base64Img', dirPath);
    }
  };

  const checkFormValidity = (): boolean => {
    return (
      data.name === '' ||
      data.image === '' ||
      data.gender === '' ||
      data.role === ''
    );
  };

  const createProfile = (create: boolean) => {
    const profileData: ProfileData = create
      ? { ...data }
      : {
          name: '',
          image: '',
          gender: '',
          role: '',
        };
    global.ipcRenderer.send('set:profile', JSON.stringify(profileData));
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete="off">
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabel}>
            First off, what&apos;s your full name?
          </FormLabel>
          <WhiteTextField
            name="name"
            label="NAME"
            variant="outlined"
            value={data.name}
            onChange={handleChange}
            className={classes.textField}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabel}>
            Please upload a nice photo of yourself.
          </FormLabel>
          {data.image === '' ? (
            <IconButton
              onClick={handleOpenDialog}
              color="primary"
              className={classes.imageUploadButton}
              component="span"
            >
              <PersonIcon className={classes.imageUploadIcon} />
            </IconButton>
          ) : (
            <Avatar
              className={classes.avatar}
              onClick={handleOpenDialog}
              src={data.image}
            />
          )}
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabel}>
            Select your avatar for dashboard display.
          </FormLabel>
          <RadioGroup
            className={classes.radioGroup}
            name="gender"
            value={data.gender}
            onChange={handleChange}
          >
            <Radio
              value="male"
              icon={
                <RadioButtonUncheckedIcon className={classes.checkedIcon} />
              }
              checkedIcon={<CheckCircleIcon className={classes.checkedIcon} />}
            />
            <img
              className={classes.radioImage}
              onClick={() => handleRadioImageClick('male')}
              src="/assets/male.svg"
            />
            <Radio
              value="female"
              icon={
                <RadioButtonUncheckedIcon className={classes.checkedIcon} />
              }
              checkedIcon={<CheckCircleIcon className={classes.checkedIcon} />}
            />
            <img
              className={classes.radioImage}
              onClick={() => handleRadioImageClick('female')}
              src="/assets/female.svg"
            />
          </RadioGroup>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formLabel}>
            What&apos;s your role in the organisation?
          </FormLabel>
          <WhiteTextField
            name="role"
            label="YOUR ROLE IN THE ORGANISATION"
            variant="outlined"
            value={data.role}
            onChange={handleChange}
            className={classes.textField}
          />
        </FormControl>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={checkFormValidity()}
          onClick={() => createProfile(true)}
        >
          Create My Profile
        </Button>
        <Button variant="outlined" onClick={() => createProfile(false)}>
          Will Do It Later
        </Button>
      </form>
    </div>
  );
}
