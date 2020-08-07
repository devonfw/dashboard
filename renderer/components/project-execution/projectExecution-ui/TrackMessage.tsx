import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

const TrackMessage = (props: { message: string }): JSX.Element => {
  const element = (
    <div>
      {!props.message || props.message === '' ? (
        <div>
          <CircularProgress />
        </div>
      ) : props.message === 'success' ? (
        <div className="success">
          <CheckCircleIcon />
        </div>
      ) : props.message === 'error' ? (
        <div className="error">
          <ErrorOutlineIcon />
        </div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );

  return element;
};

export default TrackMessage;
