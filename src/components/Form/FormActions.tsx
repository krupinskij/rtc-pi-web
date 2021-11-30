import { Theme } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const FormActions = ({ children }: Props) => {
  return <FormActionssWrapper>{children}</FormActionssWrapper>;
};

export default FormActions;

const FormActionssWrapper = styled('div')<{ theme?: Theme }>(
  ({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(2)};
    display: flex;
    flex-direction: row;
    justify-content: center;
  `
);
