import { Theme, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/system';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import AuthPanel from './components/AuthPanel';
import NotAuthPanel from './components/NotAuthPanel';

import useAuth from '../../auth/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <NavbarWrapper position="static">
      <Toolbar>
        <LogoIcon fontSize="large" />
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          RTC<LogoSpan>Pi</LogoSpan>
        </Typography>
        {!!user ? <AuthPanel /> : <NotAuthPanel />}
      </Toolbar>
    </NavbarWrapper>
  );
};

export default Navbar;

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

const LogoIcon = styled(ScreenSearchDesktopIcon)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin-right: ${theme.spacing(2)}
  `
);
