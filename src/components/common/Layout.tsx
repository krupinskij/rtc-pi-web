import { Theme } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import Navbar from '../Navbar';

const Layout: React.FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    background-color: ${theme.palette.background.default};
    height: 100vh;
    display: flex;
    flex-direction: column;
  `
);
