import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';

const AuthPanel = () => {
  return (
    <AuthPanelWrapper>
      <Button color="inherit">Wyloguj się</Button>
    </AuthPanelWrapper>
  );
};

export default AuthPanel;

const AuthPanelWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: row;
    gap: ${theme.spacing(2)}
  `
);
