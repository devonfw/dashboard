import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { alertsStyles } from './alerts.styles';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Alerts(props: {
  alertSeverity: string;
  message: string;
  operation: boolean;
  close: () => void;
}): JSX.Element {
  const classes = alertsStyles();

  return (
    <div className={classes.alertRoot}>
      <Snackbar
        open={props.operation}
        autoHideDuration={3000}
        onClose={props.close}
      >
        <Alert onClose={props.close} severity={props.alertSeverity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
