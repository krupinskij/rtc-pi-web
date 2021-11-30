import { Theme, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/system';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

const Navbar = () => {
  return (
    <NavbarWrapper position="static">
      <Toolbar>
        <LogoIcon fontSize="large" />
        <Typography variant="h5" component="div">
          RTC<LogoSpan>Pi</LogoSpan>
        </Typography>
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
