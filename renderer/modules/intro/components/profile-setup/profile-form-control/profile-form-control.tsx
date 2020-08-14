import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useProfileFormControlStyles from './profile-form-control.style';

interface ProfileFormControlProps {
  children: JSX.Element;
  formLabelText: string;
}

export default function ProfileFormControl(
  props: ProfileFormControlProps
): JSX.Element {
  const classes = useProfileFormControlStyles();
  return (
    <FormControl className={classes.root}>
      <FormLabel className={classes.formLabel}>{props.formLabelText}</FormLabel>
      {props.children}
    </FormControl>
  );
}
