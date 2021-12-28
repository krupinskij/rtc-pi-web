import {
  FilledInput,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';

import { FieldOption } from '../model';

interface Props {
  label: string;
  value: string;
  options: FieldOption[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const SelectField = ({ label, value, options, onChange }: Props) => {
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
