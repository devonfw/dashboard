import React from 'react';
import { FormType } from '../../../../../../../models/dashboard/FormType';

interface ErrorHandlerProps {
  formControl: FormType;
}

export const ErrorHandler = (props: ErrorHandlerProps): JSX.Element | null => {
  return props.formControl.error ? (
    <div className="error">{props.formControl.error}</div>
  ) : null;
};
