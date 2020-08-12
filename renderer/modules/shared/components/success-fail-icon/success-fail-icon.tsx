import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useSuccessFailIconStyles } from './success-fail-icon.styles';

interface SuccessFailIconProps {
  success?: boolean;
  fontSize?: 'small' | 'inherit' | 'default' | 'large';
}

export default function SuccessFailIcon(
  props: SuccessFailIconProps
): JSX.Element {
  const fontSize = props.fontSize ? props.fontSize : 'large';
  const classes = useSuccessFailIconStyles();

  return (
    <>
      {props.success ? (
        <CheckCircleOutlineIcon
          className={classes.success}
          fontSize={fontSize}
        />
      ) : (
        <ErrorOutlineIcon fontSize={fontSize} className={classes.error} />
      )}
    </>
  );
}
