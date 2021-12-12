import { TextField as MaterialTextField, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useField } from 'react-final-form';

interface Props {
  label: string;
  name: string;
  multiline?: boolean;
  required?: boolean;
}

interface GenericProps extends Props {
  type: 'text' | 'password';
}

const Field = ({ label, name, type, multiline, required }: GenericProps) => {
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
      variant="filled"
      color="secondary"
      multiline={multiline}
      required={required}
      focused
    />
  );
};

export const TextField = ({ label, name, multiline, required }: Props) => {
  return <Field label={label} name={name} type="text" multiline={multiline} required={required} />;
};

export const PasswordField = ({ label, name, multiline, required }: Props) => {
  return (
    <Field label={label} name={name} type="password" multiline={multiline} required={required} />
  );
};

const FieldWrapper = styled(MaterialTextField)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(4, 2)};
    
    & input, & textarea {
      font-size: 1.5rem;
    }

    & label {
      font-size: 1.25rem;    
      top: -5px;
    }
  `
);
