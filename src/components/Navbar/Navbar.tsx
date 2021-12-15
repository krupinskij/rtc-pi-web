import { Button, Theme, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import useAuth from 'auth/useAuth';

import AuthPanel from './components/AuthPanel';
import NotAuthPanel from './components/NotAuthPanel';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <NavbarWrapper position="static">
      <NavbarToolbar>
        <Button color="inherit" component={Link} to="/">
          <Typography variant="h5">
            RTC<LogoSpan>Pi</LogoSpan>
          </Typography>
        </Button>
        {!!user ? <AuthPanel /> : <NotAuthPanel />}
      </NavbarToolbar>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`;

const NavbarWrapper = styled(AppBar)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    height: ${theme.spacing(16)};

    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary}
  `
);

const LogoSpan = styled('span')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    color: ${theme.palette.primary.main}
  `
);
