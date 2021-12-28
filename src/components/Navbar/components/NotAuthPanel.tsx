import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotAuthPanel = () => {
  const { t } = useTranslation();

  return (
    <NotAuthPanelWrapper>
      <Button color="inherit" component={Link} to="/settings">
        {t('navbar.settings')}
      </Button>
      <Button color="inherit" component={Link} to="/login">
        {t('navbar.login')}
      </Button>
      <Button color="inherit" component={Link} to="/register">
        {t('navbar.register')}
      </Button>
    </NotAuthPanelWrapper>
  );
};

export default NotAuthPanel;

const NotAuthPanelWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    display: flex;
    flex-direction: row;
    gap: ${theme.spacing(2)}
  `
);
