import { FormControlLabel, Switch, Theme } from '@mui/material';
import { styled } from '@mui/system';

interface Props {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export const SwitchField = ({ label, checked, onChange }: Props) => {
  return (
    <FieldControlWrapper
      control={<Switch checked={checked} onChange={onChange} />}
      label={label}
      labelPlacement="start"
    />
  );
};

const FieldControlWrapper = styled(FormControlLabel)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(4, 2)};
    flex-direction: row;

    & label {
      font-size: 1.25rem;    
      top: -5px;
    }
  `
);
