import { ChangeEvent } from 'react';
import ProfileFormControl from '../profile-form-control/profile-form-control';
import WhiteTextField from '../../../../shared/components/white-text-field/white-text-field';

interface FormControlRoleProps {
  value: string;
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormControlRole(
  props: FormControlRoleProps
): JSX.Element {
  const label = "What's your role in the organisation?";
  return (
    <ProfileFormControl formLabelText={label}>
      <WhiteTextField
        name="role"
        label="YOUR ROLE IN THE ORGANISATION"
        variant="outlined"
        value={props.value}
        onChange={props.changeHandler}
        style={{ width: '70%' }}
      />
    </ProfileFormControl>
  );
}
