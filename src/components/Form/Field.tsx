import { TextField as MaterialTextField, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { Field as FinalField } from 'react-final-form';

interface Props {
  label: string;
  name: string;
}

interface GenericProps extends Props {
  type: 'text' | 'password';
}

const Field = ({ label, name, type }: GenericProps) => {
  return (
    <FinalField name={name}>
      {(props: any) => (
        <FieldWrapper type={type} label={label} variant="filled" color="info" focused />
      )}
    </FinalField>
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
    
    && input {
      color: white;
    }
  `
);
