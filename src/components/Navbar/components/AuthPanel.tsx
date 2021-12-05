import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import useAuth from '../../../auth/useAuth';

const AuthPanel = () => {
  const { user, logout } = useAuth();
  return (
    <AuthPanelWrapper>
      {user?.email}
      <Button color="inherit" onClick={() => logout()}>
        Wyloguj się
      </Button>
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
