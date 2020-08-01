import CircularProgress from '@material-ui/core/CircularProgress';
import { useSpinnerStyles } from './spinner.styles';

interface SpinnerProps {
  inProgress: boolean;
  progress: number;
}

export default function Spinner(props: SpinnerProps): JSX.Element | null {
  const spinner: string = useSpinnerStyles().spinner;

  if (!props.inProgress) {
    return null;
  }

  return (
    <CircularProgress
      variant="static"
      className={spinner}
      value={props.progress}
    ></CircularProgress>
  );
}
