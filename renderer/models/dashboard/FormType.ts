import { ChangeEvent } from 'react';

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