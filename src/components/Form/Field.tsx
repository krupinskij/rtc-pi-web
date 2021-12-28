import {
  FilledInput,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField as MaterialTextField,
  Theme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useField } from 'react-final-form';
import { useTranslation } from 'react-i18next';

import { FieldOption } from './model';

interface Props {
  label: string;
  name: string;
  value?: string;
  multiline?: boolean;
  required?: boolean;
}

interface GenericProps extends Props {
  type: 'text' | 'password';
}

const Field = ({ label, name, type, value, multiline, required }: GenericProps) => {
  const { t } = useTranslation();
  const { input, meta } = useField(name, { defaultValue: value });
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
      helperText={meta.touched && t(meta.error?.message, meta.error?.data)}
      variant="filled"
      color="secondary"
      multiline={multiline}
      required={required}
      focused
    />
  );
};

export const TextField = ({ label, name, value, multiline, required }: Props) => {
  return (
    <Field
      label={label}
      name={name}
      value={value}
      type="text"
      multiline={multiline}
      required={required}
    />
  );
};

export const PasswordField = ({ label, name, value, multiline, required }: Props) => {
  return (
    <Field
      label={label}
      name={name}
      value={value}
      type="password"
      multiline={multiline}
      required={required}
    />
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

interface SelectProps {
  label: string;
  value: string;
  options: FieldOption[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const SelectField = ({ label, value, options, onChange }: SelectProps) => {
  const { t } = useTranslation();
  return (
    <FormControlWrapper>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} input={<SelectedOption />}>
        {options.map(({ value, display, icon }) => (
          <MenuItem key={value} value={value}>
            {!!icon && (
              <OptionIconWrapper>
                <OptionIcon src={icon} alt={value} />
              </OptionIconWrapper>
            )}
            <ListItemText primary={t(display)} />
          </MenuItem>
        ))}
      </Select>
    </FormControlWrapper>
  );
};

const FormControlWrapper = styled(FormControl)<{ theme?: Theme }>(
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

const SelectedOption = styled(FilledInput)`
  && > * {
    display: flex;
    align-items: center;
  }
`;

const OptionIconWrapper = styled(ListItemIcon)`
  width: 50px;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
`;

const OptionIcon = styled('img')`
  height: 20px;
`;
