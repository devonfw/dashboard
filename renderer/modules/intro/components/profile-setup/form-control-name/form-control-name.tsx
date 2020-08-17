import { ChangeEvent } from 'react';
import ProfileFormControl from '../profile-form-control/profile-form-control';
import WhiteTextField from '../white-textfield';

interface FormControlNameProps {
  value: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormControlName(
  props: FormControlNameProps
): JSX.Element {
  const label = "First off, what's your full name?";
  return (
    <ProfileFormControl formLabelText={label}>
      <WhiteTextField
        name="name"
        label="NAME"
        variant="outlined"
        value={props.value}
        onChange={props.changeHandler}
        style={{ width: '70%' }}
      />
    </ProfileFormControl>
  );
}
