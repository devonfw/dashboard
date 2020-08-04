import Button from '@material-ui/core/Button';
import { useAcceptButtonStyles } from './accept-button.styles';

interface AcceptButtonProps {
  disabled?: boolean;
  href?: string;
  className?: string;
  children: JSX.Element | string;
}

export default function AcceptButton(props: AcceptButtonProps): JSX.Element {
  const button: string = useAcceptButtonStyles().button;

  return (
    <Button
      variant="contained"
      color="primary"
      disabled={props.disabled}
      className={`${button} ${props.className}`}
      href={props.href}
    >
      {props.children}
    </Button>
  );
}
