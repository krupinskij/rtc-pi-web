import { Theme } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import Navbar from '../Navbar';

const Layout: React.FC = ({ children }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <PageWrapper>{children}</PageWrapper>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    background-color: ${theme.palette.background.default};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(8)};
  `
);

const PageWrapper = styled('main')`
  margin: auto 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
