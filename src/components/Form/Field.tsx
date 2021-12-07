import { TextField as MaterialTextField, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useField } from 'react-final-form';

interface Props {
  label: string;
  name: string;
}

interface GenericProps extends Props {
  type: 'text' | 'password';
}

const Field = ({ label, name, type }: GenericProps) => {
  const { input, meta } = useField(name);
  return (
    <FieldWrapper
      type={type}
      label={label}
      name={name}
      value={input.value}
      onChange={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      required={true}
      variant="filled"
      color="secondary"
      focused
    />
  );
};

export const TextField = ({ label, name }: Props) => {
  return <Field label={label} name={name} type="text" />;
};

export const PasswordField = ({ label, name }: Props) => {
  return <Field label={label} name={name} type="password" />;
};

const FieldWrapper = styled(MaterialTextField)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(4, 2)};
    
    & input {
      font-size: 1.25rem;
    }
  `
);
