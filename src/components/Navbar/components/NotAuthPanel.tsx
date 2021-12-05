import { Button, Theme } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const NotAuthPanel = () => {
  return (
    <NotAuthPanelWrapper>
      <Button color="inherit" component={Link} to="/login">
        Zaloguj się
      </Button>
      <Button color="inherit" component={Link} to="/register">
        Zarejestruj się
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
