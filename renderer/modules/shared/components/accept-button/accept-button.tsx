import Button, { ButtonProps } from '@material-ui/core/Button';

export default function AcceptButton(props: ButtonProps): JSX.Element {
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={props.disabled}
      className={props.className}
      href={props.href}
      onClick={props.onClick}
      startIcon={props.startIcon}
      disableElevation
    >
      {props.children}
    </Button>
  );
}
