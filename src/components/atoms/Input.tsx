import React, {
  FunctionComponent,
  InputHTMLAttributes,
  Fragment,
  RefObject,
} from 'react';

type InputTypeType =
  | 'text'
  | 'email'
  | 'new-password'
  | 'password'
  | 'telephone'
  | '2fa'
  | 'number'
  | 'percentage'
  | 'yen'
  | 'date'
  | 'time'
  | 'checkbox';

const getProps = (type: InputTypeType = 'text') => {
  switch (type) {
    case 'text':
      return { type: 'text' } as InputHTMLAttributes<HTMLInputElement>;
    case 'email':
      return {
        type: 'email',
        maxLength: 255,
        inputMode: 'email',
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'password':
      return {
        type: 'password',
        maxLength: 100,
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'telephone':
      return {
        type: 'tel',
        maxLength: 13,
      } as InputHTMLAttributes<HTMLInputElement>;
    case '2fa':
      return {
        type: 'tel',
        maxLength: 6,
        autoComplete: 'off',
        inputMode: 'tel',
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'number':
      return {
        type: 'number',
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'percentage':
      return {
        type: 'number',
        step: '0.01',
        min: '0',
        max: '100',
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'yen':
      return {
        type: 'text',
        inputMode: 'numeric',
        maxLength: 16,
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'date':
      return {
        type: 'date',
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'time':
      return {
        type: 'time',
      } as InputHTMLAttributes<HTMLInputElement>;
    case 'checkbox':
      return {
        type: 'checkbox',
      } as InputHTMLAttributes<HTMLInputElement>;
    default:
      return {};
  }
};

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: string;
  innerRef?: RefObject<HTMLInputElement>;
  type?: InputTypeType;
};

const Input: FunctionComponent<InputProps> = ({ innerRef, type, ...props }) => (
  <Fragment>
    <input {...getProps(type)} {...props} ref={innerRef} />
  </Fragment>
);

export default Input;
