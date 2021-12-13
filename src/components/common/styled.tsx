import { Card, CardContent, Theme } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

export const ContentWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    width: clamp(400px, 45%, 700px);
    margin: auto;
    margin-bottom: ${theme.spacing(4)};
  `
);

export const ContentWrapperWide = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    width: clamp(400px, 75%, 1200px);
    margin: auto;
    margin-bottom: ${theme.spacing(12)};
  `
);

export const ContentBody: React.FC = ({ children }) => {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
