import { Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormTitle = ({ children }: Props) => {
  return (
    <TitledWrapper>
      <Typography align="center" variant="h3" component="h2">
        {children}
      </Typography>
    </TitledWrapper>
  );
};

export default FormTitle;

const TitledWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(2, 4)}
  `
);
