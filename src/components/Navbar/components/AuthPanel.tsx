import { Button, Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router';
import useAuth from '../../../auth/useAuth';

const AuthPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AuthPanelWrapper>
      <Button color="inherit">Mój profil</Button>
      <Button color="inherit">Panel sterowania</Button>
      <Button color="inherit">Dodaj kamerę</Button>
      <Button color="inherit" onClick={() => onLogout()}>
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
