import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import useAuth from 'auth/useAuth';

const AuthPanel = () => {
  const { t } = useTranslation();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AuthPanelWrapper>
      <Button color="inherit" component={Link} to="/dashboard">
        {t('navbar.my-cameras')}
      </Button>
      <Button color="inherit" component={Link} to="/settings">
        {t('navbar.settings')}
      </Button>
      <Button color="inherit" onClick={() => onLogout()}>
        {t('navbar.sign-out')}
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
