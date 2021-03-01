import React from 'react';
import { ChangeEvent } from 'react';
import { JavaFormControls } from '../../../../../../models/dashboard/IJavaInitializer';
import { ValueType } from '../../../../../../models/dashboard/FormType';
import { databaseKeys } from '../../../../../../models/dashboard/Database';
import { ErrorHandler } from '../validation/error-handler/error-handler';
import Input from '../form-inputs/input/Input';
import Select from '../form-inputs/select/Select';
import SelectWorkspace from '../form-inputs/select-workspace/select-workspace';

interface JavaFormBuiderProps {
  formControls: JavaFormControls;
  workspaces: string[];
  updateFormState: (formChangeState: ValueType) => void;
}

export const JavaFormBuider = (props: JavaFormBuiderProps): JSX.Element => {
  const formChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.updateFormState({
      identifier: event.target.id,
      event: event,
    });
  };
  const handleWorkspaceSelection = (option: string) => {
    props.updateFormState({ identifier: 'workspace', value: option });
  };
  return (
    <>
      <Input
        elementConfig={props.formControls.group.elementConfig}
        value={props.formControls.group.value}
        invalid={!props.formControls.group.valid}
        touched={props.formControls.group.touched}
        changed={formChangeHandler}
        inputProps={{ id: props.formControls.group.elementConfig.id }}
      />
      <ErrorHandler formControl={props.formControls.group} />

      <Input
        elementConfig={props.formControls.artifact.elementConfig}
        value={props.formControls.artifact.value}
        invalid={!props.formControls.artifact.valid}
        touched={props.formControls.artifact.touched}
        changed={formChangeHandler}
        inputProps={{ id: props.formControls.artifact.elementConfig.id }}
      />
      <ErrorHandler formControl={props.formControls.artifact} />
      <Input
        elementConfig={props.formControls.packageName.elementConfig}
        value={props.formControls.packageName.value}
        invalid={!props.formControls.packageName.valid}
        touched={props.formControls.packageName.touched}
        disabled={props.formControls.packageName.disabled}
        inputProps={{ id: props.formControls.packageName.elementConfig.id }}
      />
      <Input
        elementConfig={props.formControls.version.elementConfig}
        value={props.formControls.version.value}
        invalid={!props.formControls.version.valid}
        touched={props.formControls.version.touched}
        inputProps={{ id: props.formControls.version.elementConfig.id }}
        changed={formChangeHandler}
      />
      <ErrorHandler formControl={props.formControls.version} />
      <Select
        elementConfig={props.formControls.db.elementConfig}
        elementSelectOptions={databaseKeys}
        value={props.formControls.db.value}
        changed={(event: ChangeEvent<HTMLInputElement>) => {
          props.updateFormState({
            identifier: props.formControls.db.elementConfig.id,
            event: event,
          });
        }}
      />
      <SelectWorkspace
        workspaces={props.workspaces}
        onSelected={handleWorkspaceSelection}
      ></SelectWorkspace>
    </>
  );
};
