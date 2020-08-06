import Button, { ButtonProps } from '@material-ui/core/Button';
import { useAcceptButtonStyles } from './accept-button.styles';

export default function AcceptButton(props: ButtonProps): JSX.Element {
  const button: string = useAcceptButtonStyles().button;

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={props.disabled}
      className={`${button} ${props.className}`}
      href={props.href}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
