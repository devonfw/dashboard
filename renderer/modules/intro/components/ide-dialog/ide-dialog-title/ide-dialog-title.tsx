import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Avatar from '@material-ui/core/Avatar';
import useIdeDialogTitleStyles from './ide-dialog-title.style';

export default function IdeDialogTitle(): JSX.Element {
  const classes = useIdeDialogTitleStyles();

  return (
    <>
      <Avatar className={classes.avatar}>
        <PlaylistAddCheckIcon />
      </Avatar>
      <p className={classes.titleText}>
        Devon Dashboard detected already existing devon instances in your system
      </p>
    </>
  );
}
