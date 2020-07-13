import { ChangeEvent } from 'react';

export interface IJavaInitializerForm {
    workspaceDir: string[],
    formControls: FormControls
}

export interface FormControls {
    group: FormType,
    artifact: FormType,
    name: FormType,
    packageName: FormType,
    version: FormType,
    db: FormType,
    devonInstances: FormType,
    formIsValid: boolean,
    batch: boolean
}

export interface FormType {
    elementType?: string,
    elementConfig?: {
        label: string,
        id: string,
        options?: SelectOptionType[]
    },
    value: string,
    validation?: {
        required: boolean,
        pattern?: RegExp,
        existing?: boolean
    },
    valid?: boolean,
    touched?: boolean,
    error?: string,
    disabled?: boolean
}

export interface ValueType {
    event?: ChangeEvent<HTMLInputElement>,
    identifier: string,
    value?: string
}

export interface SelectOptionType {
    value: string,
    displayValue: string
}