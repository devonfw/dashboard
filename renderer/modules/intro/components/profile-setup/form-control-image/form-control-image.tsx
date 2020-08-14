import ProfileFormControl from '../profile-form-control/profile-form-control';
import PersonIcon from '@material-ui/icons/Person';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MessageSenderService from '../../../../shared/services/renderer/messageSender.service';
import useProfileControlImageStyles from './from-control-image.style';

export default function FormControlImage(props: {
  value: string;
}): JSX.Element {
  const label = 'Please upload a nice photo of yourself.';

  const messageSender: MessageSenderService = new MessageSenderService();

  const classes = useProfileControlImageStyles();

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

  return (
    <ProfileFormControl formLabelText={label}>
      {props.value === '' ? (
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
          src={props.value}
        />
      )}
    </ProfileFormControl>
  );
}
