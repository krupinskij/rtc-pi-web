import { Theme, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/system';

const Navbar = () => {
  return (
    <NavbarWrapper position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
          RaspRTC
        </Typography>
      </Toolbar>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled(AppBar)<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    height: ${theme.spacing(16)};

    color: white;
    background-color: ${theme.palette.grey[800]};
  `
);
